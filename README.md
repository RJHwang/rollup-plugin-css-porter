# rollup-plugin-css-porter

A rollup plugin to collect and combine all the imported css file. Such as `import './my.css'`.
Then output them to a standalone css file. Besides, use [clean-css](https://www.npmjs.com/package/clean-css)
to create a minified css file as you wish.

Supported rollup version :

| plugin version | rollup version
|----------------|----------------
| 1.x            | 1.0.0+
| 0.3.x          | 0.48.0~0.68.2
| 0.1.0~0.2.x    | 0.36.0~0.47.6

## Installation

Use `npm`:

```bash
npm install --save-dev rollup-plugin-css-porter
// or
npm i -D rollup-plugin-css-porter
```

Use `yarn`:

```bash
yarn add rollup-plugin-css-porter --dev
```

## Plugin options

| Name     | ValueType         | Required | Description
|----------|-------------------|----------|-------------
| dest     | `String`            | false    | Default value is the same dir of `'bundle.write(options)'` `options.file`
| raw      | `Boolean`<br>`String` | false    | 1. `Boolean` value means whether output a raw css file, default value is `true`<br>2. `String` value means output raw css file to this path
| minified | `Boolean`<br>`String` | false    | 1. `Boolean` value means whether output a minified css file, default value is `true`<br>2. `String` value means output minified css file to this path

> If set `raw` or `minified` option to a `String` value, `dest` option will be ignored.

## Usage

### Case 1 (default behavior):

Output to a standalone css file and a minified css file.
The output destination is the same dir of `'bundle.write(options)'` `options.file`.

```js
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-porter';

rollup({
  input: 'main.js',
  plugins: [ css() ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
  });
});
```

### Case 2:

Output to a standalone css file without minified css file.
The output destination is the same dir of `'bundle.write(options)'` `options.file`.

```js
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-porter';

rollup({
  input: 'main.js',
  plugins: [ css({minified: false}) ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
  });
});
```

### Case 3:

Output to a specific path if config the plugin `options.dest`.

```js
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-porter';

rollup({
  input: 'main.js',
  plugins: [ css({dest: 'path-to-my-dir/bundle.css'}) ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
  });
});
```

### Case 4:

Output to a standalone css file with only minified css file.
The output destination is the same dir of `'bundle.write(options)'` `options.file`.

```js
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-porter';

rollup({
  input: 'main.js',
  plugins: [ css({raw: false}) ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
  });
});
```

### Case 5:

Custom output filenames by config a string value for plugin `raw` and `minified` option :

```js
import { rollup } from 'rollup';
import css from 'rollup-plugin-css-porter';

rollup({
  input: 'main.js',
  plugins: [ css({
    raw: 'custom.css',
    minified: 'custom.min.css',
  }) ]
}).then(bundle => {
  bundle.write({
    format: 'es',
    file: 'bundle.js'
  });
});
```

Or:

```js
css({
  raw: 'custom.css',
  minified: false,
})
```

Or:

```js
css({
  raw: false,
  minified: 'custom.min.css',
})
```

## Build

Use `npm`:

```bash
npm run build
```

Use `yarn`:

```bash
yarn run build
```

## Run test

Use `npm`:

```bash
npm test
```

Use `yarn`:

```bash
yarn test
```
