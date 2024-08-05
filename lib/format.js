import {camelCase, capitalCase, constantCase, paramCase, pascalCase, snakeCase} from 'change-case-all';

const argumentNamesToMethodMap = [
  {
    description: 'Converts string to camelCase',
    method: camelCase,
    names: ['camel', 'camelcase'],
    title: 'Camel Case',
  },
  {
    description: 'Converts string to Capital Case',
    method: capitalCase,
    names: ['capital', 'capitalcase'],
    title: 'Capital Case',
  },
  {
    description: 'Converts string to CONSTANT_CASE',
    method: constantCase,
    names: ['constant', 'constantcase'],
    title: 'Constant Case',
  },
  {
    description: 'Converts string to param-case',
    method: paramCase,
    names: ['param', 'paramcase'],
    title: 'Param Case',
  },
  {
    description: 'Converts string to PascalCase',
    method: pascalCase,
    names: ['pascal', 'pascalcase'],
    title: 'Pascal Case',
  },
  {
    description: 'Converts string to snake_case',
    method: snakeCase,
    names: ['snake', 'snakecase'],
    title: 'Snake Case',
  },

  {
    description: 'Returns the original string',
    method(inputString) {
      return inputString;
    },
    names: ['string', 'raw', 'original'],
    title: 'Original',
  },
  {
    description: 'Removes all spaces from the string',
    method(inputString) {
      return inputString.replaceAll(/\s/g, '');
    },
    names: ['smooshed', 'nospace', 'nospacestring'],
    title: 'No Space',
  },
  {
    description: 'Returns the string with randomly capitalized letters',
    method(inputString) {
      return inputString
        .split('')
        .map(function (char) {
          return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
        })
        .join('');
    },
    names: ['random', 'randomcase', 'randomstring'],
    title: 'Random',
    title: 'Random',
  },
];

const describeAllOptions = () => {
  return argumentNamesToMethodMap
    .map(function (entry) {
      return `${entry.title} - (${entry.names.join(' ')}) \n${entry.description}`;
    })
    .join('\n');
};

const addAdditionalNames = argumentNamesToMethodMap => {
  const methods = [];
  for (const key in argumentNamesToMethodMap) {
    const thisObject = {
      method: argumentNamesToMethodMap[key],
      names: [],
    };

    thisObject.names.push(key.toLowerCase(), `${key}case`, `${key} case`);

    const method = argumentNamesToMethodMap[key];
    argumentNamesToMethodMap[key.toLowerCase()] = method;
    methods.push(thisObject);
  }
  return methods;
};

const lookupMethod = (argumentNamesToMethodMap, format) => {
  format = format.toLowerCase();

  const selected = argumentNamesToMethodMap.find(function (method) {
    return method.names.includes(format);
  });
  if (selected) {
    return selected.method;
  }
  return null;
};

const format = (inputString, format) => {
  const method = lookupMethod(argumentNamesToMethodMap, format);

  return method === null ? `Sorry, specified format "${format}" is not supported. Here is the raw output: ${inputString}.` : method(inputString);
};

export {describeAllOptions, format};
