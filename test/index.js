import test from 'ava'
import { EOL } from 'os'
import fsp from 'fs-promise'
import { rollup } from 'rollup'
import buble from 'rollup-plugin-buble'
import css from '../dist/rollup-plugin-css-porter.cjs.js'

process.chdir(__dirname)

function readFile(file) {
  return fsp.readFile(file, { encoding: 'UTF-8' })
}

function toPlatformLineBreak(source) {
  return source.replace(/\n/g, EOL)
}

test("should save to '.css' and '.min.css' file", async t => {
  const toDir = 'temp/t1/'
  await fsp.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  // clean
  await fsp.remove(jsFile)
  await fsp.remove(cssFile)
  await fsp.remove(minifiedCssFile)

  const bundle = await rollup({
    entry: 'samples/main1.js',
    plugins: [css()]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))
  t.true(await fsp.exists(cssFile))
  let content = await readFile(cssFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}'), content)

  t.true(await fsp.exists(minifiedCssFile))
  content = await readFile(minifiedCssFile)
  t.is('.c1{padding:0}', content)
});

test("should only save to '.css' file", async t => {
  const toDir = 'temp/t2/'
  await fsp.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  const bundle = await rollup({
    entry: 'samples/main1.js',
    plugins: [css({ minified: false })]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))
  t.true(await fsp.exists(cssFile))
  let content = await readFile(cssFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}'), content)

  t.false(await fsp.exists(minifiedCssFile))
});

test("should only save to '.min.css' file", async t => {
  const toDir = 'temp/t3/'
  await fsp.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  const bundle = await rollup({
    entry: 'samples/main1.js',
    plugins: [css({ raw: false })]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))
  t.true(await fsp.exists(minifiedCssFile))
  const content = await readFile(minifiedCssFile)
  t.is('.c1{padding:0}', content)

  t.false(await fsp.exists(cssFile))
});

test("should combine two css file and save to '.css' and '.min.css' file", async t => {
  const toDir = 'temp/t4/'
  await fsp.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  const bundle = await rollup({
    entry: 'samples/main2.js',
    plugins: [css()]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(cssFile))
  let content = await readFile(cssFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}\n.c2 {\n  margin: 0;\n}'), content)
});

test("should save to '.css' and '.min.css' file with custom names", async t => {
  const toDir = 'temp/t5/'
  await fsp.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'
  const customRawFile = toDir + 'custom.css'
  const customMinifiedFile = toDir + 'custom.min.css'

  // clean
  await fsp.remove(jsFile)
  await fsp.remove(cssFile)
  await fsp.remove(minifiedCssFile)

  const bundle = await rollup({
    entry: 'samples/main1.js',
    plugins: [css({
      raw: customRawFile,
      minified: customMinifiedFile,
    })]
  })

  await bundle.write({
    format: 'es',
    dest: jsFile
  });

  t.true(await fsp.exists(jsFile))
  t.false(await fsp.exists(cssFile))
  t.true(await fsp.exists(customRawFile))
  let content = await readFile(customRawFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}'), content)

  t.false(await fsp.exists(minifiedCssFile))
  t.true(await fsp.exists(customMinifiedFile))
  content = await readFile(customMinifiedFile)
  t.is('.c1{padding:0}', content)
});
