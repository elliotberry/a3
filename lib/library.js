import {A3Error, ErrorCodes} from './errors.js';
import adjectives from './lists/adjectives.js';
import animals from './lists/animals.js';
import {createSeededIndex, cryptoIndex} from './random.js';

/**
Upper bound on adjectives, to guard against accidental huge requests.
*/
const MAX_ADJECTIVES = 100;

const pick = (list, randomIndex) => list[randomIndex(list.length)];

function randomAdjective(randomIndex = cryptoIndex) {
  return pick(adjectives, randomIndex);
}

function randomAnimal(randomIndex = cryptoIndex) {
  return pick(animals, randomIndex);
}

const validateAdjectiveCount = value => {
  if (!Number.isSafeInteger(value) || value < 0 || value > MAX_ADJECTIVES) {
    throw new A3Error(ErrorCodes.INVALID_ADJECTIVE_COUNT, `number of adjectives must be an integer between 0 and ${MAX_ADJECTIVES}`, {expected: `integer 0-${MAX_ADJECTIVES}`, received: value});
  }
};

/**
Generate adjectives followed by an animal.

With a `seed`, the result is deterministic: the same seed and adjective count
always give the same words (as long as the word lists don't change between
versions). Without one, words are chosen with a cryptographically secure RNG.

@param {number} [numberOfAdjectives=2] integer, 0-100
@param {object} [options]
@param {number|string|bigint} [options.seed] makes the output deterministic
@returns {string[]}
@throws {A3Error} INVALID_ADJECTIVE_COUNT, INVALID_SEED
*/
function generate(numberOfAdjectives = 2, options = {}) {
  validateAdjectiveCount(numberOfAdjectives);

  const {seed} = options ?? {};
  const randomIndex = seed === undefined ? cryptoIndex : createSeededIndex(seed);

  const sentence = [];
  for (let index = 0; index < numberOfAdjectives; index++) {
    sentence.push(randomAdjective(randomIndex));
  }

  sentence.push(randomAnimal(randomIndex));
  return sentence;
}

export {generate, MAX_ADJECTIVES, randomAdjective, randomAnimal};
