import {
  camelCase,
  capitalCase,
  constantCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from "change-case-all";

const argumentNamesToMethodMap = [
   { 
    names: ["camel", "camelcase"],
    method: camelCase, description: "Converts string to camelCase",
    title: "Camel Case"
   },
   { 
    names: ["capital", "capitalcase"],
    method: capitalCase, description: "Converts string to Capital Case",
    title: "Capital Case"
   },
   { 
    names: ["constant", "constantcase"],
    method: constantCase, description: "Converts string to CONSTANT_CASE",
    title: "Constant Case"
   },
   { 
    names: ["param", "paramcase"],
    method: paramCase, description: "Converts string to param-case",
    title: "Param Case"
   },
   { 
    names: ["pascal", "pascalcase"],
    method: pascalCase, description: "Converts string to PascalCase",
    title: "Pascal Case"
   },
   { 
    names: ["snake", "snakecase"],
    method: snakeCase, description: "Converts string to snake_case",
    title: "Snake Case"
   },

   { 
    names: ["string", "raw", "original"],
    method: function(inputString) {
      return inputString;
    },
    description: "Returns the original string",
    title: "Original"
   },
   { 
    names: ["smooshed", "nospace", "nospacestring"],
    method: function(inputString) {
      return inputString.replace(/\s/g, '');
    },
    description: "Removes all spaces from the string",
    title: "No Space"
   },
   { 
    title: "Random",
    names: ["random", "randomcase", "randomstring"],
    method: function(inputString) {
      return inputString.split('').map(function (char) {
        return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
      }).join('');
    },
    description: "Returns the string with randomly capitalized letters",
    title: "Random"
   }
];

const describeAllOptions = () => {

  return argumentNamesToMethodMap.map(function (entry) {
    let str = `${entry.title} - (${entry.names.join(" ")}) \n${entry.description}`
    return str;
  }).join("\n");

}

const addAdditionalNames = (argumentNamesToMethodMap) => {

  const methods = [];
  for (let key in argumentNamesToMethodMap) {
    let thisObj = {
      names: [],
      method: argumentNamesToMethodMap[key]
    }

    thisObj.names.push(key.toLowerCase());
    thisObj.names.push(key + "case")
    thisObj.names.push(key + " case");
  
    let method = argumentNamesToMethodMap[key];
    argumentNamesToMethodMap[key.toLowerCase()] = method;
    methods.push(thisObj);
  }
  return methods;

}

const lookupMethod = (argumentNamesToMethodMap, format) => {
  format = format.toLowerCase();

  let selected = argumentNamesToMethodMap.find(function (method) {
    return method.names.includes(format);
  });
  if (selected) {
    return selected.method;
  }
  return null;
}

const format = (inputString, format) => {
  const method = lookupMethod(argumentNamesToMethodMap, format);

  if (method !== null) {
    let ret = method(inputString);
    return ret;
  } else {
    return `Sorry, specified format "${format}" is not supported. Here is the raw output: ${inputString}.`;
  }
}

export {describeAllOptions, format};