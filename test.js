import assert from 'assert';
import { format, describeAllOptions } from './lib/format.js';

import adjectives from './lib/lists/adjectives.js';
import animals from './lib/lists/animals.js';
import { generate, randomAnimal, randomAdjective } from './lib/lib.js';


async function testGenerate() {
    let sentence = await generate();
    let words = sentence.split(' ');
    assert(words.length >= 2, 'generate should return a sentence with at least two words');
    words.slice(0, -1).forEach(word => {
        assert(adjectives.includes(word), 'Each word except the last in the sentence should be an adjective');
    });
    assert(animals.includes(words[words.length - 1]), 'The last word in the sentence should be an animal');
    console.log('Generated sentence:', sentence);
}

async function runTests() {
    console.log('Running tests...');
    await testGenerate();
    console.log('All tests passed!');
}

runTests();
