import {format} from './lib/format.js';
import {generate} from './lib/library.js';

/**
Generate a human-readable ID: adjectives followed by an animal.
@param {number} [numberOfAdjectives=2]
@param {string} [formatType='array'] - 'array' returns string[]; any other supported format returns a string
@param {object} [options]
@param {number|string|bigint} [options.seed] - makes the output deterministic
@returns {string[]|string}
@throws {A3Error} on invalid adjective count, seed, or format
*/
export default function main(numberOfAdjectives = 2, formatType = 'array', options = {}) {
  const result = generate(numberOfAdjectives, options);
  return formatType === 'array' ? result : format(result.join(' '), formatType);
}

export {A3Error, ErrorCodes} from './lib/errors.js';
export {describeAllOptions, format} from './lib/format.js';
export {generate} from './lib/library.js';
