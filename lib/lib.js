import crypto from 'crypto';
import adjectives from './lists/adjectives.js';
import animals from './lists/animals.js';
async function getRandomElement(list) {
  let index = await crypto.randomInt(0, list.length - 1);
  return list[index];
}
const randomAnimal = async function () {
  return await getRandomElement(animals);
}
const randomAdjective = async function () {
  return await getRandomElement(adjectives);
}
const generate = async function (numberOfAdjectives = 2) {
  const sentence = [];
  let iterationArray = [...Array(numberOfAdjectives + 1).keys()];
  for await (let f of iterationArray) {
    let word = await getRandomElement(adjectives);
    sentence.push(word);
  }
  let animal = await getRandomElement(animals);
  sentence.push(animal);
  return sentence.join(' ');
};

export {
  generate,
  randomAnimal,
  randomAdjective}
