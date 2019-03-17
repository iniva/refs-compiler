#!/usr/bin/env node
/* eslint no-console: off */

const program = require('commander');

const { version } = require('../package');
const compile = require('../lib');

let inputFile = null;
let outputFile = null;

program
  .version(version)
  .usage('[options] <file>')
  .option('-o, --output <file>', 'The path for the output file');

program.parse(process.argv);

if (program.args[0]) {
  [inputFile] = program.args;
}

if (program.output) {
  outputFile = program.output;
}

if (!inputFile) {
  program.help();
  process.exit(1);
}

(async () => {
  try {
    const results = await compile(inputFile, outputFile);
    const message = results.outputFile ? `\nFile saved to ${results.outputFile}` : '';

    console.log(`Done. ${message}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
