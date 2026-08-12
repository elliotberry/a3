import crypto from 'node:crypto';

import adjectives from './lists/adjectives.js';
import animals from './lists/animals.js';

function getRandomElement(list) {
  return list[crypto.randomInt(list.length)];
}

function randomAnimal() {
  return getRandomElement(animals);
}

function randomAdjective() {
  return getRandomElement(adjectives);
}

function generate(numberOfAdjectives = 2) {
  const count = Math.max(0, Math.floor(Number(numberOfAdjectives)) || 0);
  const sentence = [];

  for (let i = 0; i < count; i++) {
    sentence.push(randomAdjective());
  }

  sentence.push(randomAnimal());
  return sentence;
}

export {generate, randomAdjective, randomAnimal};
