#!/usr/bin/env node
import chalk from 'chalk';
import yargs from 'yargs/yargs';

import {describeAllOptions, format} from './lib/format.js';
import {generate} from './lib/lib.js';

const run = async () => {
  const argv = yargs(process.argv.slice(2))
    .usage('Usage: $0 [options]')
    .alias('f', 'format')
    .describe('f', `output format type; options are:\n ${describeAllOptions()}`)
    .alias('a', 'adjectives')
    .describe('a', 'number of adjectives')
    .example([['$0 -f capital', 'create a random name in capital case']])
    .version(process.env.npm_package_version).argv;

  const numberOfAdjectives = argv.adjectives || 1;
  let formatType = argv.format || 'string';
  formatType = formatType.toLowerCase();

  generate(numberOfAdjectives).then(function (output) {
    const formattedOutput = format(output, formatType);
    console.log(chalk.green.bold(formattedOutput));
  });
};

run();
