import crypto from 'node:crypto';

import adjectives from './lists/adjectives.js';
import animals from './lists/animals.js';
async function getRandomElement(list) {
  const index = await crypto.randomInt(0, list.length - 1);
  return list[index];
}
const randomAnimal = async function () {
  return await getRandomElement(animals);
};
const randomAdjective = async function () {
  return await getRandomElement(adjectives);
};
const generate = async function (numberOfAdjectives = 2) {
  const sentence = [];
  const iterationArray = [...new Array(numberOfAdjectives + 1).keys()];
  for await (const f of iterationArray) {
    const word = await getRandomElement(adjectives);
    sentence.push(word);
  }
  const animal = await getRandomElement(animals);
  sentence.push(animal);
  return sentence.join(' ');
};

export {generate, randomAdjective, randomAnimal};
