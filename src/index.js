import fs, { access } from 'fs';
import path from 'path';

const jsonToObj = json => JSON.parse(
  // fs.readFileSync(
  //   path.resolve(__dirname, json)
  // )
  fs.readFileSync(json, 'utf8')
);

const genDiff = (before, after) => {
  const beforeObj = jsonToObj(before);
  const afterObj = jsonToObj(after);

  const keys = new Set(Object.keys(beforeObj).concat(Object.keys(afterObj)));

  return Array.from(keys).reduce((acc, key) => {
    const beforeHas = beforeObj.hasOwnProperty(key);
    const afterHas = afterObj.hasOwnProperty(key);
    if (beforeHas && !afterHas) {
      return acc + `- ${key}: ${beforeObj[key]}\n`;
    } else if (!beforeHas && afterHas) {
      return acc + `+ ${key}: ${afterObj[key]}\n`;
    } else if (afterObj[key] === beforeObj[key]) {
      return acc + `  ${key}: ${afterObj[key]}\n`;
    }
    return acc + `+ ${key}: ${afterObj[key]}\n` + `- ${key}: ${beforeObj[key]}\n`;
  }, '');
};

export default genDiff;
