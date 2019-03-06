import fs from 'fs';
import genDiff from '../src';

const oldConfigFilePathJSON = '__tests__/__fixtures__/before.json';
const newConfigFilePathJSON = '__tests__/__fixtures__/after.json';
const correctDiffFilePath = '__tests__/__fixtures__/result.txt';

test('diff flat json files', () => {
  const received = genDiff(oldConfigFilePathJSON, newConfigFilePathJSON);
  const expected = fs.readFileSync(correctDiffFilePath, 'utf8');
  expect(received).toEqual(expected);
});
