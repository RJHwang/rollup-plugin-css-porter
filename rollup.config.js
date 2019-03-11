import buble from 'rollup-plugin-buble';

var external = Object.keys(require('./package.json').dependencies);

export default {
  input: 'src/index.js',
  external: external,
  plugins: [buble()]
};