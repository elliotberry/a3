#!/usr/bin/env node
const generate = require("./lib/index");
const defaults = require("./lib/defaults-config");
console.log(defaults)
const { format, numberOfAdjectives } = defaults;

const chalk = require("chalk");

let u = process.argv.join(" ");
if (u.indexOf("help") > -1 || u.indexOf("-h") > -1) {
  console.log(`
${chalk.white.bold("🐈🐈🐈   A3: Adjective Adjective Animal   🐈🐈🐈")}
> Outputs some random adjectives and a random animal, for slugs, or something. 
> Usage: ${chalk.white.bgBlackBright(
    "$ a3 [number of adjectives, default 2] [output format]"
  )}
> Example: ${chalk.white.bgBlackBright("$ a3 3 camelCase")}

Output formats are ${chalk.green("camelCase")}, ${chalk.green(
    "capitalCase"
  )}, ${chalk.green("constantCase")}, ${chalk.green("dotCase")}, ${chalk.green(
    "headerCase"
  )}, ${chalk.green("noCase")}, ${chalk.green("paramCase")}, ${chalk.green(
    "pascalCase"
  )}, ${chalk.green("pathCase")}, ${chalk.green(
    "sentenceCase"
  )}, and ${chalk.green("snakeCase")}.`);
} else {
  generate({
    adjectives: numberOfAdjectives,
    format: format,
  }).then(function (output) {
    console.log(chalk.green.bold(output));
  });
}
