import css from '../../dist/rollup-plugin-css-porter.es.js'

export default {
  entry: './index.js',
  dest: '../temp/rollup-watch-test.js',
  plugins: [css({minified: false})]
};