const convict = require("convict");
const formats = require('./formats')

let formatsArr = [];
for (const prop in formats) {
  formatsArr.push(prop)
}

// Define a schema
const config = convict({
  format: {
    doc: "String output format.",
    format: formatsArr,
    default: "sentenceCase"
  },
  numberOfAdjectives: {
    doc: "Number of adjective to use",
    format: 'Number',
    default: 1
  },
  
});
config.loadFile("./config.json");
config.validate({ allowed: "strict" });
module.exports = config._instance;
