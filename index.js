#!/usr/bin/env node
import generate from "./lib/lib.js";
import chalk from "chalk";

let argzString = process.argv.join(" ");
if (argzString.indexOf("help") > -1 || argzString.indexOf("-h") > -1) {
  console.log(`
${chalk.white.bold("🐈🐈🐈   A3: Adjective Adjective Animal   🐈🐈🐈")}
> Outputs some random adjectives and a random animal, for slugs, or something. `);
} else {
  let numberOfAdjectives = process.argv[2] || 1;
  let format = process.argv[3] || "string";
  generate(
    numberOfAdjectives,
    format
  ).then(function (output) {
    console.log(chalk.green.bold(output));
  });
}
