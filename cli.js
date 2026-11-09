#!/usr/bin/env node
import chalk from 'chalk';
import {hideBin} from 'yargs/helpers';
import yargs from 'yargs/yargs';

import main from './index.js';
import {A3Error} from './lib/errors.js';
import {describeAllOptions} from './lib/format.js';

const run = async () => {
  const argv = await yargs(hideBin(process.argv))
    .scriptName('a3')
    .usage('Usage: $0 [options]')
    .option('f', {
      alias: 'format',
      default: 'string',
      describe: `output format; options:\n${describeAllOptions()}`,
      type: 'string',
    })
    .option('a', {
      alias: 'adjectives',
      default: 2,
      describe: 'number of adjectives before the animal',
      type: 'number',
    })
    .option('s', {
      alias: 'seed',
      describe: 'seed for deterministic output (same seed, same name)',
      type: 'string',
    })
    .example('$0 -f capital', 'create a random name in Capital Case')
    .example('$0 -a 1 -f param', 'one adjective, kebab-case')
    .example('$0 -s user-42', 'always the same name for "user-42"')
    .help()
    .version()
    .parse();

  const numberOfAdjectives = argv.adjectives;
  const formatType = String(argv.format).toLowerCase();

  try {
    const result = main(numberOfAdjectives, formatType, {seed: argv.seed});
    console.log(chalk.green(result));
  } catch (error) {
    if (error instanceof A3Error) {
      console.error(chalk.red(`Error [${error.code}]: ${error.message}`));
      process.exitCode = 1;
      return;
    }
    throw error;
  }
};

run();
