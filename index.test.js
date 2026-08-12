import assert from 'node:assert/strict';
import {describe, it} from 'node:test';

import main, {format, generate} from './index.js';
import {randomAdjective, randomAnimal} from './lib/lib.js';
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
