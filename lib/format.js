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
        .map(char => (Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()))
        .join('');
    },
    names: ['random', 'randomcase', 'randomstring'],
    title: 'Random',
  },
];

const describeAllOptions = () => {
  return argumentNamesToMethodMap
    .map(entry => `${entry.title} - (${entry.names.join(' ')})\n${entry.description}`)
    .join('\n');
};

const lookupMethod = format => {
  const normalized = format.toLowerCase();
  const selected = argumentNamesToMethodMap.find(method => method.names.includes(normalized));
  return selected ? selected.method : null;
};

const format = (inputString, formatType) => {
  const method = lookupMethod(formatType);
  return method === null
    ? `Sorry, specified format "${formatType}" is not supported. Here is the raw output: ${inputString}.`
    : method(inputString);
};

export {describeAllOptions, format};
