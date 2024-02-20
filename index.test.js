import assert from 'assert';
import {describe, it} from 'node:test';
import { format, describeAllOptions } from './lib/format.js';

import adjectives from './lib/lists/adjectives.js';
import animals from './lib/lists/animals.js';
import { generate, randomAnimal, randomAdjective } from './lib/lib.js';

describe('generate', () => {
    it('should return a sentence with at least two words', async () => {
        let sentence = await generate();
        let words = sentence.split(' ');
        assert(words.length >= 2, 'generate should return a sentence with at least two words');
    });

    it('each word except the last in the sentence should be an adjective', async () => {
        let sentence = await generate();
        let words = sentence.split(' ');
        words.slice(0, -1).forEach(word => {
            assert(adjectives.includes(word), 'Each word except the last in the sentence should be an adjective');
        });
    });

    it('the last word in the sentence should be an animal', async () => {
        let sentence = await generate();
        let words = sentence.split(' ');
        assert(animals.includes(words[words.length - 1]), 'The last word in the sentence should be an animal');
    });
});

