#!/usr/bin/env node
import generate from './lib/lib.js';
import chalk from 'chalk';
import format from './lib/format.js';
import yargs from 'yargs/yargs';

const run = async () => {
  var argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .alias('o', 'output')
    .describe('o', 'output directory')
    .alias('f', 'format')
    .describe('f', 'output format (string, camel, capital, constant, dot, header, no, param, pascal, path, sentence, snake)')
    .alias('a', 'adjectives')
    .describe('a', 'number of adjectives')
    .example([['$0 -f capital', 'create a random name in capital case']])
    .version(process.env.npm_package_version).argv;

  let numberOfAdjectives = argv.adjectives || 1;
  let formatType = argv.format || 'string';
  formatType = formatType.toLowerCase();
  generate(numberOfAdjectives).then(function (output) {
    let formattedOutput = format(output, formatType);
    console.log(chalk.green.bold(formattedOutput));
  });
};
run();
