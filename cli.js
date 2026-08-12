#!/usr/bin/env node
import chalk from 'chalk';
import yargs from 'yargs/yargs';
import {hideBin} from 'yargs/helpers';

import {describeAllOptions} from './lib/format.js';
import main from './index.js';

const run = async () => {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('a3')
    .usage('Usage: $0 [options]')
    .option('f', {
      alias: 'format',
      describe: `output format; options:\n${describeAllOptions()}`,
      type: 'string',
      default: 'string',
    })
    .option('a', {
      alias: 'adjectives',
      describe: 'number of adjectives before the animal',
      type: 'number',
      default: 2,
    })
    .example('$0 -f capital', 'create a random name in Capital Case')
    .example('$0 -a 1 -f param', 'one adjective, kebab-case')
    .help()
    .version()
    .parse();

  const numberOfAdjectives = argv.adjectives;
  const formatType = String(argv.format).toLowerCase();
  const result = main(numberOfAdjectives, formatType);
  console.log(chalk.green(result));
};

run();
