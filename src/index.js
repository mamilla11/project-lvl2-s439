import fs from 'fs';
import _ from 'lodash';

const genDiff = (before, after) => {
  const beforeObj = JSON.parse(fs.readFileSync(before, 'utf8'));
  const afterObj = JSON.parse(fs.readFileSync(after, 'utf8'));

  const keys = new Set(Object.keys(beforeObj).concat(Object.keys(afterObj)));

  return Array.from(keys).reduce((acc, key) => {
    const beforeHas = _.has(beforeObj, key);
    const afterHas = _.has(afterObj, key);
    if (beforeHas && !afterHas) {
      return `${acc}- ${key}: ${beforeObj[key]}\n`;
    }
    if (!beforeHas && afterHas) {
      return `${acc}+ ${key}: ${afterObj[key]}\n`;
    }
    if (afterObj[key] === beforeObj[key]) {
      return `${acc}  ${key}: ${afterObj[key]}\n`;
    }
    return `${acc}+ ${key}: ${afterObj[key]}\n- ${key}: ${beforeObj[key]}\n`;
  }, '');
};

export default genDiff;
