var randomNumber = require("random-number-csprng");
const lists = require("./lists");

async function secureRandom(min, max) {
  return await randomNumber(min, max);
}

async function getRandomElement(list) {
  let index = await secureRandom(0, list.length);
  return list[index];
}

module.exports = {
  randomAdjective: async function randomAdj() {
    return await getRandomElement(lists.adjectives);
  },

  randomAnimal: async function randomAnim() {
    return await getRandomElement(lists.animals);
  },
};
