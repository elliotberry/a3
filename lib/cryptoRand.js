const bytez = require("crypto").randomBytes(2);

module.exports = {
	randomAdjective : function randomAdj () {
			let bytes = bytez();
			let num = bytes.readUInt16LE(0);
			num = num % 16384; // smallest power of 2 > num adjectives (8980)
			if (num < lists.adjectives.length && lists.adjectives[num]) {
				return lists.adjectives[num];
			}
			else {
				return randomAdj();
			}
	},

	randomAnimal : function randomAnim () {
		let bytes = bytez();
			var num = bytes.readUInt16LE(0);
			num = num % 2048; // smallest power of 2 > num animals (1750)
			if (num < lists.animals.length && lists.animals[num]) {
				return lists.animals[num];
			}
			else {
				return randomAnim();
			}
	}
};