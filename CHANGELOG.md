# [rollup-plugin-css-porter](https://github.com/RJHwang/rollup-plugin-css-porter) changelog

## 1.0.2 2019-03-13

- Polishing README - add plugin options
- Polishing README - fixed docs error

## 1.0.1 2019-03-13

- Polishing README - add supported rollup version

## 1.0.0 2019-03-12

- Upgrade to support rollup-1.x (test pass from rollup 1.0.0 to 1.6.0)

## 0.3.0 2019-03-12

- Upgrade to rollup-0.68.2
    > This is the latest supported rollup version on `0.3.x`,
    > because from rollup-1.0.0+, rollup-plugin api changed.
    > Supported rollup version from `0.48.0` to `0.68.2`.

## 0.2.1 2019-03-11

- Upgrade to rollup-0.47.6
    > This is the latest supported rollup version on `0.2.x`,
    > because from rollup-0.48.0+, the `options` param in `bundle.write(options)`, `options.dest` be renamed to `options.file`.
    > Note that from rollup-0.38.0, you will see some test log `'Generated an empty bundle'` output to the console.

## 0.2.0 2019-01-04

- Support minified output only by setting option `raw=false`
- Support raw output only by setting option `minified=false`
- Support custom output file name by setting option `raw="custom.css"` or `minified="custom.min.css"`

## 0.1.2 2017-02-23

- fixed css content cache for issue#1
- polish README.md

## 0.1.1 2016-12-08

- polish README.md

## 0.1.0 2016-12-08

- initial
