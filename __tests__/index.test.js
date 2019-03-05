import genDiff from '../src';
import fs from 'fs';

const beforeJSON = '__tests__/__fixtures__/before.json';
const afterJSON = '__tests__/__fixtures__/after.json';
const result = '__tests__/__fixtures__/result.txt';

test('diff flat json files', () => {
  expect(genDiff(beforeJSON, afterJSON)).toEqual(fs.readFileSync(result, 'utf8'));
});