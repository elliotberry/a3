import crypto from 'node:crypto';

import {A3Error, ErrorCodes} from './errors.js';

const UINT32_RANGE = 2 ** 32;

/**
Validate a seed and normalize it to a string.
Numbers, bigints and strings are accepted; `1` and `'1'` are the same seed.
@param {unknown} seed
@returns {string}
*/
const normalizeSeed = seed => {
  const type = typeof seed;
  const isValid = (type === 'string' && seed.length > 0) || (type === 'number' && Number.isFinite(seed)) || type === 'bigint';

  if (!isValid) {
    throw new A3Error(ErrorCodes.INVALID_SEED, 'seed must be a non-empty string, a finite number, or a bigint', {expected: 'non-empty string | finite number | bigint', received: describe(seed)});
  }
  return String(seed);
};

const describe = value => {
  if (value === null) return 'null';
  if (typeof value === 'number') return `number (${value})`;
  if (typeof value === 'string') return 'empty string';
  return typeof value;
};

/**
Non-deterministic source: cryptographically secure, unbiased.
@param {number} max exclusive upper bound
@returns {number} integer in [0, max)
*/
const cryptoIndex = max => crypto.randomInt(max);

/**
Deterministic source: the same seed always yields the same sequence.
Builds a stream from HMAC-SHA256(key = sha256(seed), message = counter) and
uses rejection sampling, so indices are unbiased.
@param {number|string|bigint} seed
@returns {(max: number) => number}
*/
const createSeededIndex = seed => {
  const key = crypto
    .createHash('sha256')
    .update(`a3:${normalizeSeed(seed)}`)
    .digest();
  const counterBytes = Buffer.alloc(8);
  let counter = 0n;
  let block = Buffer.alloc(0);
  let offset = 0;

  const nextUint32 = () => {
    if (offset + 4 > block.length) {
      counterBytes.writeBigUInt64BE(counter++);
      block = crypto.createHmac('sha256', key).update(counterBytes).digest();
      offset = 0;
    }
    const value = block.readUInt32BE(offset);
    offset += 4;
    return value;
  };

  return max => {
    const limit = UINT32_RANGE - (UINT32_RANGE % max);
    let value = nextUint32();
    while (value >= limit) value = nextUint32();
    return value % max;
  };
};

export {createSeededIndex, cryptoIndex};
