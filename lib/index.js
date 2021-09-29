const randWord = require("./cryptoRand");
//const formats = require("./formats");
//const { seperators, seperate } = require("./seperate");
//const chalk = require("chalk");

const generate = async function (options={numberOfAdjectives: 2}) {
  //const { numberOfAdjectives, format } = options;
  //console.log(format);
  const sentence = [];
  let r = [...Array(numberOfAdjectives).keys()]
  for (f of r) {
    let word = await randWord.randomAdjective();
    sentence.push(word);
  }
  let animal = await randWord.randomAnimal();
  sentence.push(animal);

  return sentence.join(" ")
 // let formatted = formats[format](s)
 //console.log(formatted)
  //return seperate(formatted);
};

module.exports = generate;