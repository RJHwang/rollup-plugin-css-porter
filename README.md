# rollup-plugin-css-porter-porter

A rollup plugin to collect and combine all the imported css file. Such as `import myCss from './my.css'`. 
Then output them to a standalone css file. Besides, use [clean-css](https://www.npmjs.com/package/clean-css) 
to create a minified css file as you wish.

## Installation

```bash
npm install --save-dev rollup-plugin-css-porter
```

## Usage

### Case 1 (default behavior):
Output to a standalone css file and a minified css file.
The output destination is the same dir with `bundle.write()` options.dest

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-css-porter';

rollup({
  entry: 'main.js',
  plugins: [ css() ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'bundle.js'
  });
});
```

### Case 2:
Output to a standalone css file without minified css file.
The output destination is the same dir with `bundle.write()` options.dest

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-css-porter';

rollup({
  entry: 'main.js',
  plugins: [ css({minified: false}) ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'bundle.js'
  });
});
```

### Case 3:
Output to a specific path if config the plugin options.dest

```js
import { rollup } from 'rollup';
import stylus from 'rollup-plugin-css-porter';

rollup({
  entry: 'main.js',
  plugins: [ css({dest: 'path-to-my-dir/bundle.css'}) ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    dest: 'bundle.js'
  });
});
```

## Build

```bash
npm run build
```
## Run test

```bash
npm test
```