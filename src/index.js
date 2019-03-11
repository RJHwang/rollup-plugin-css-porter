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
      if (!styles.hasOwnProperty(id) || styles[id] != code) styles[id] = code
      return ''
    },
    onwrite(opts) {
      if (!Object.keys(styles).length) return // nothing to output

      const outputRaw = options.raw !== false
      const outputMinified = options.minified !== false

      const customRawName = typeof options.raw === 'string'
      const customMinifiedName = typeof options.minified === 'string'

      // the file of output: use this plugin options.dest or `bundle.write()` options.file
      // 1. From 0.48.0+, the options param in bundle.write(options), options.dest rename to file
      let dest = options.dest || opts.file
      if (!dest && !customRawName && !customMinifiedName) return // output nothing if no dest config

      // remove js module extname
      if (dest) {
        dest = dest.slice(0, -1 * path.extname(dest).length)
      }

      // combine all css code
      let cssCode = []
      Object.keys(styles).forEach(key => cssCode.push(styles[key]))
      cssCode = cssCode.join(EOL) // join with platform line break

      const ops = []

      if (outputRaw) {
        ops.push(fsp.writeFile(customRawName ? options.raw : dest + '.css', cssCode))
      }

      if (outputMinified) {
        ops.push(new Promise(function(resolve, reject) {
          new CleanCss(options.cleanCSSOptions).minify(cssCode, (err, m) => {
            if (err) reject(err)
            else resolve(fsp.writeFile(customMinifiedName ? options.minified : dest + '.min.css', m.styles)) // output minified css
          })
        }))
      }

      return Promise.all(ops)
    }
  }
}
