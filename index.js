#!/usr/bin/env node
import {describeAllOptions, format} from './lib/format.js';
import {generate} from './lib/lib.js';

const main = async (numberOfAdjectives = 2, formatType = 'array') => {
  let result = await generate(numberOfAdjectives);
  if (formatType !== 'array') {
    result = result.join(' ');
    return format(result, formatType);
  } else {
    return result;
  }
};

export default main;