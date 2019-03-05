import fs from 'fs';
import genDiff from '../src';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';
const result = '__tests__/__fixtures__/result.txt';

test('diff flat json files', () => {
  const received = genDiff(beforeJSON, afterJSON);
  const expected = fs.readFileSync(result, 'utf8');
  expect(received).toEqual(expected);
});
