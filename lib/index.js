const randWord  = require("./cryptoRand");

module.exports = async function(param) {
	var numAdjectives = 2; // default
	var format = "param";

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
			throw new Error("Invalid argument type.");
		}
	}

	var promises = [];
	for (var i = 0; i < numAdjectives; i += 1) {
		promises.push(randWord.randomAdjective());
	}
	promises.push(randWord.randomAnimal());

	return Promise.all(promises)
	.then(function (parts) {
		return changeCase[format](parts.join(" "));
	});
};