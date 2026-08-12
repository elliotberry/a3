#!/usr/bin/env node
import {format} from './lib/format.js';
import {generate} from './lib/lib.js';

/**
 * Generate a human-readable ID: adjectives followed by an animal.
 * @param {number} [numberOfAdjectives=2]
 * @param {string} [formatType='array'] - 'array' returns string[]; any other supported format returns a string
 * @returns {string[]|string}
 */
const main = (numberOfAdjectives = 2, formatType = 'array') => {
  const result = generate(numberOfAdjectives);
  if (formatType === 'array') {
    return result;
  }
  return format(result.join(' '), formatType);
};

export default main;
export {generate} from './lib/lib.js';
export {format, describeAllOptions} from './lib/format.js';
