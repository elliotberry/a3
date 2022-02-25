const crypto = require("crypto");
const lists = require("./lists");


async function getRandomElement(list) {
  let index = await crypto.randomInt(min, max)
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
