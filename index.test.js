import assert from 'node:assert/strict';
import {describe, it} from 'node:test';

import main, {A3Error, ErrorCodes, format, generate} from './index.js';
import {randomAdjective, randomAnimal} from './lib/library.js';
import adjectives from './lib/lists/adjectives.js';
import animals from './lib/lists/animals.js';

describe('generate', () => {
  it('returns adjectives followed by an animal', () => {
    const words = generate(2);
    assert.equal(words.length, 3);
    assert.ok(adjectives.includes(words[0]));
    assert.ok(adjectives.includes(words[1]));
    assert.ok(animals.includes(words[2]));
  });

  it('respects the adjective count', () => {
    assert.equal(generate(0).length, 1);
    assert.equal(generate(1).length, 2);
    assert.equal(generate(3).length, 4);
  });

  it('defaults to two adjectives', () => {
    assert.equal(generate().length, 3);
  });
});

describe('deterministic generation', () => {
  it('returns the same words for the same seed', () => {
    assert.deepEqual(generate(2, {seed: 'user-42'}), generate(2, {seed: 'user-42'}));
    assert.deepEqual(main(3, 'param', {seed: 7}), main(3, 'param', {seed: 7}));
  });

  it('is pinned to a known value (guards against accidental algorithm changes)', () => {
    // Changing the algorithm or the word lists changes these; do so deliberately.
    assert.deepEqual(generate(2, {seed: 'a3'}), ['unicameral', 'misshapen', 'plaice']);
  });

  it('differs across seeds', () => {
    const names = new Set();
    for (let index = 0; index < 50; index++) names.add(generate(2, {seed: index}).join(' '));
    assert.ok(names.size > 45);
  });

  it('does not collide on anagram seeds', () => {
    assert.notDeepEqual(generate(2, {seed: 'ab'}), generate(2, {seed: 'ba'}));
  });

  it('treats numeric and string seeds equivalently', () => {
    assert.deepEqual(generate(2, {seed: 123}), generate(2, {seed: '123'}));
    assert.deepEqual(generate(2, {seed: 123n}), generate(2, {seed: '123'}));
  });

  it('keeps shared prefix words when the adjective count changes', () => {
    const two = generate(2, {seed: 'x'});
    const three = generate(3, {seed: 'x'});
    assert.deepEqual(three.slice(0, 2), two.slice(0, 2));
  });

  it('stays random without a seed', () => {
    const names = new Set();
    for (let index = 0; index < 20; index++) names.add(generate(2).join(' '));
    assert.ok(names.size > 1);
  });
});

const expectA3Error = (function_, code) =>
  assert.throws(function_, error => {
    assert.ok(error instanceof A3Error);
    assert.equal(error.name, 'A3Error');
    assert.equal(error.code, code);
    assert.equal(typeof error.message, 'string');
    assert.equal(typeof error.details, 'object');
    assert.equal(error.toJSON().code, code);
    return true;
  });

describe('structured errors', () => {
  it('rejects invalid adjective counts', () => {
    // eslint-disable-next-line unicorn/no-null
    for (const bad of [-1, 1.5, NaN, Infinity, '2', null, 101]) {
      expectA3Error(() => generate(bad), ErrorCodes.INVALID_ADJECTIVE_COUNT);
    }
  });

  it('includes the offending value in details', () => {
    try {
      generate(-3);
      assert.fail('should have thrown');
    } catch (error) {
      assert.equal(error.details.received, -3);
    }
  });

  it('rejects invalid seeds', () => {
    // eslint-disable-next-line unicorn/no-null
    for (const bad of ['', null, NaN, Infinity, {}, [], true]) {
      expectA3Error(() => generate(2, {seed: bad}), ErrorCodes.INVALID_SEED);
    }
  });

  it('rejects unsupported formats instead of returning an error string', () => {
    expectA3Error(() => format('a b c', 'nope'), ErrorCodes.UNSUPPORTED_FORMAT);
    expectA3Error(() => format('a b c'), ErrorCodes.UNSUPPORTED_FORMAT);
    expectA3Error(() => main(2, 'nope'), ErrorCodes.UNSUPPORTED_FORMAT);
  });

  it('lists supported formats in the details', () => {
    try {
      format('a b c', 'nope');
      assert.fail('should have thrown');
    } catch (error) {
      assert.ok(error.details.expected.includes('camel'));
      assert.equal(error.details.received, 'nope');
    }
  });
});

describe('random helpers', () => {
  it('randomAdjective returns an adjective', () => {
    assert.ok(adjectives.includes(randomAdjective()));
  });

  it('randomAnimal returns an animal', () => {
    assert.ok(animals.includes(randomAnimal()));
  });
});

describe('main', () => {
  it('returns an array by default', () => {
    const result = main(2);
    assert.ok(Array.isArray(result));
    assert.equal(result.length, 3);
  });

  it('formats when a format type is given', () => {
    const result = main(1, 'param');
    assert.equal(typeof result, 'string');
    assert.match(result, /^[a-z]+-[a-z]+$/);
  });
});

describe('format', () => {
  it('supports common cases', () => {
    assert.equal(format('blue happy fox', 'camel'), 'blueHappyFox');
    assert.equal(format('blue happy fox', 'pascal'), 'BlueHappyFox');
    assert.equal(format('blue happy fox', 'snake'), 'blue_happy_fox');
    assert.equal(format('blue happy fox', 'param'), 'blue-happy-fox');
  });
});

describe('word lists', () => {
  it('does not include known inappropriate terms', () => {
    for (const word of ['nazi', 'raped', 'retarded', 'tit', 'cockroach']) {
      assert.equal(adjectives.includes(word), false, `adjective list still has ${word}`);
      assert.equal(animals.includes(word), false, `animal list still has ${word}`);
    }
  });
});
