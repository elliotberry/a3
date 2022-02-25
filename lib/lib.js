import crypto from "crypto";
import adjectives from "./lists/adjectives.js";
import animals from "./lists/animals.js";

import * as formatObject from "change-case";


async function getRandomElement(list) {
  let index = await crypto.randomInt(0, list.length - 1);
  return list[index];
}
const formatOutput = async function (sentence, format) {
  if (formatObject[format]) {
    return formatObject[format](sentence);
  } else {
    return "Sorry, format not found";
  }
};
const generate = async function (numberOfAdjectives = 2, format = "string") {
  const sentence = [];
  let iterationArray = [...Array(numberOfAdjectives + 1).keys()];
  for await (let f of iterationArray) {
    let word = await getRandomElement(adjectives);
    sentence.push(word);
  }
  let animal = await getRandomElement(animals);
  sentence.push(animal);
  if (format === "string") {
    return sentence.join(" ");
  } else {
    return await formatOutput(sentence, format);
  }
};

export default generate;
