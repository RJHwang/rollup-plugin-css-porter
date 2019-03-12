import test from 'ava'
import { EOL } from 'os'
import fse from 'fs-extra'
import { rollup } from 'rollup'
import css from '../dist/rollup-plugin-css-porter.cjs.js'

process.chdir(__dirname)

function readFile(file) {
  return fse.readFile(file, { encoding: 'UTF-8' })
}

function toPlatformLineBreak(source) {
  return source.replace(/\n/g, EOL)
}

test("should save to '.css' and '.min.css' file", async t => {
  const toDir = 'temp/t1/'
  await fse.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  // clean
  await fse.remove(jsFile)
  await fse.remove(cssFile)
  await fse.remove(minifiedCssFile)

  const bundle = await rollup({
    input: 'samples/main1.js',
    plugins: [css()]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))
  t.true(await fse.exists(cssFile))
  let content = await readFile(cssFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}'), content)

  t.true(await fse.exists(minifiedCssFile))
  content = await readFile(minifiedCssFile)
  t.is('.c1{padding:0}', content)
});

test("should only save to '.css' file", async t => {
  const toDir = 'temp/t2/'
  await fse.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  const bundle = await rollup({
    input: 'samples/main1.js',
    plugins: [css({ minified: false })]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))
  t.true(await fse.exists(cssFile))
  let content = await readFile(cssFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}'), content)

  t.false(await fse.exists(minifiedCssFile))
});

test("should only save to '.min.css' file", async t => {
  const toDir = 'temp/t3/'
  await fse.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  const bundle = await rollup({
    input: 'samples/main1.js',
    plugins: [css({ raw: false })]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))
  t.true(await fse.exists(minifiedCssFile))
  const content = await readFile(minifiedCssFile)
  t.is('.c1{padding:0}', content)

  t.false(await fse.exists(cssFile))
});

test("should combine two css file and save to '.css' and '.min.css' file", async t => {
  const toDir = 'temp/t4/'
  await fse.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'

  const bundle = await rollup({
    input: 'samples/main2.js',
    plugins: [css()]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(cssFile))
  let content = await readFile(cssFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}\n.c2 {\n  margin: 0;\n}'), content)
});

test("should save to '.css' and '.min.css' file with custom names", async t => {
  const toDir = 'temp/t5/'
  await fse.remove(toDir) // clean
  const jsFile = toDir + 'main.js'
  const cssFile = toDir + 'main.css'
  const minifiedCssFile = toDir + 'main.min.css'
  const customRawFile = toDir + 'custom.css'
  const customMinifiedFile = toDir + 'custom.min.css'

  // clean
  await fse.remove(jsFile)
  await fse.remove(cssFile)
  await fse.remove(minifiedCssFile)

  const bundle = await rollup({
    input: 'samples/main1.js',
    plugins: [css({
      raw: customRawFile,
      minified: customMinifiedFile,
    })]
  })

  await bundle.write({
    format: 'es',
    file: jsFile
  });

  t.true(await fse.exists(jsFile))
  t.false(await fse.exists(cssFile))
  t.true(await fse.exists(customRawFile))
  let content = await readFile(customRawFile)
  t.is(toPlatformLineBreak('.c1 {\n  padding: 0;\n}'), content)

  t.false(await fse.exists(minifiedCssFile))
  t.true(await fse.exists(customMinifiedFile))
  content = await readFile(customMinifiedFile)
  t.is('.c1{padding:0}', content)
});
