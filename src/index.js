import { createFilter } from 'rollup-pluginutils'
import { EOL } from 'os'
import path from 'path'
import fsp from 'fs-promise'
import CleanCss from 'clean-css'

const ext = /\.css$/;

export default function(options = {}) {
  if (!options.include) options.include = '**/*.css'
  const filter = createFilter(options.include, options.exclude);
  const styles = {}
  return {
    name: 'rollup-plugin-css-porter',
    transform(code, id) {
      if (!ext.test(id)) return
      if (!filter(id)) return

      // cache all css code
      if (!styles.hasOwnProperty(id)) styles[id] = code
      return ''
    },
    onwrite(opts) {
      if (!Object.keys(styles).length) return // nothing to output

      // the file of output: use this plugin options.dest or `bundle.write()` options.dest
      let dest = options.dest || opts.dest
      if (!dest) return // output nothing if no dest config

      // remove js module extname
      dest = dest.slice(0, -1 * path.extname(dest).length)

      // combine all css code
      let cssCode = []
      Object.keys(styles).forEach(key => cssCode.push(styles[key]))
      cssCode = cssCode.join(EOL) // join with platform line break

      // output origin css
      return fsp.writeFile(dest + '.css', cssCode).then(() => {
        // default behavior is to create a minified css file
        if (options.minified === false) return

        // minified css code: https://www.npmjs.com/package/clean-css#how-to-make-sure-remote-imports-are-processed-correctly
        return new Promise(function(resolve, reject) {
          new CleanCss(options.cleanCSSOptions).minify(cssCode, function(err, m) {
            if (err) reject(err)
            else resolve(fsp.writeFile(dest + '.min.css', m.styles)) // output minified css
          })
        })
      })
    }
  }
}