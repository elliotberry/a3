const randWord  = require("./cryptoRand");
const changeCase = require("change-case");
const chalk = require('chalk');
module.exports = async function(param) {
	let numAdjectives = 2; // default
	if (param) {
		if (typeof param === "number") {
			numAdjectives = param;
		}
		else if (typeof param === "string") {
			format = param;
		}
		else if (typeof param === "object") {
			numAdjectives = param.adjectives || numAdjectives;
			format = param.format || format;
		}
		else {
			throw new Error(chalk.white.bgRed.bold("Invalid argument type."));
		}

	
		if (typeof changeCase[format] !== "function") {
			throw new Error(`Invalid type of output format. Formats are ${chalk.white.bgBlue.bold('camelCase')}, ${chalk.white.bgBlue.bold('capitalCase')}, ${chalk.white.bgBlue.bold('constantCase')}, ${chalk.white.bgBlue.bold('dotCase')}, ${chalk.white.bgBlue.bold('headerCase')}, ${chalk.white.bgBlue.bold('noCase')}, ${chalk.white.bgBlue.bold('paramCase')}, ${chalk.white.bgBlue.bold('pascalCase')}, ${chalk.white.bgBlue.bold('pathCase')}, ${chalk.white.bgBlue.bold('sentenceCase')}, and ${chalk.white.bgBlue.bold('snakeCase')}.`);
		}
	}

	var promises = [];
	for (var i = 0; i < numAdjectives; i += 1) {
		promises.push(randWord.randomAdjective());
	}
	promises.push(randWord.randomAnimal());

	let y = await Promise.all(promises);
	return changeCase[format](y.join(" "));
};