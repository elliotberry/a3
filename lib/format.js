import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from "change-case";

const argumentNamesToMethodMap = {
  "camel": camelCase,
  "capital": capitalCase,
  "constant": constantCase,
  "dot": dotCase,
  "header": headerCase,
  "no": noCase,
  "param": paramCase,
  "pascal": pascalCase,
  "path": pathCase,
  "sentence": sentenceCase,
  "snake": snakeCase,

  "camelcase": camelCase,
  "capitalcase": capitalCase,
  "constantcase": constantCase,
  "dotcase": dotCase,
  "headercase": headerCase,
  "nocase": noCase,
  "paramcase": paramCase,
  "pascalcase": pascalCase,
  "pathcase": pathCase,
  "sentencecase": sentenceCase,
  "snakecase": snakeCase
};


const format = (inputString, format) => {
  if (format === "string") {
    return inputString;
  }
  const method = argumentNamesToMethodMap[format];

  if (method) {
    let ret = method(inputString);
    return ret;
  } else {
    return `Sorry, specified format "${format}" is not supported.`;
  }
}

export default format;