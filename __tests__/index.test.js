import fs from 'fs';
import genDiff from '../src';

const testFlatConfigFilesData = [
  [
    '__tests__/__fixtures__/beforeFlat.json',
    '__tests__/__fixtures__/afterFlat.json',
    '__tests__/__fixtures__/resultFlat.txt',
  ],
  [
    '__tests__/__fixtures__/beforeFlat.yaml',
    '__tests__/__fixtures__/afterFlat.yaml',
    '__tests__/__fixtures__/resultFlat.txt',
  ],
  [
    '__tests__/__fixtures__/beforeFlat.ini',
    '__tests__/__fixtures__/afterFlat.ini',
    '__tests__/__fixtures__/resultFlat.txt',
  ],
];

const testNestedConfigFilesData = [
  [
    '__tests__/__fixtures__/beforeNested.json',
    '__tests__/__fixtures__/afterNested.json',
    '__tests__/__fixtures__/resultNested.txt',
  ],
  [
    '__tests__/__fixtures__/beforeNested.yaml',
    '__tests__/__fixtures__/afterNested.yaml',
    '__tests__/__fixtures__/resultNested.txt',
  ],
  [
    '__tests__/__fixtures__/beforeNested.ini',
    '__tests__/__fixtures__/afterNested.ini',
    '__tests__/__fixtures__/resultNested.txt',
  ],
];

const testPlainOutputData = [
  [
    '__tests__/__fixtures__/beforeFlat.json',
    '__tests__/__fixtures__/afterFlat.json',
    '__tests__/__fixtures__/resultFlatPlain.txt',
  ],
  [
    '__tests__/__fixtures__/beforeNested.json',
    '__tests__/__fixtures__/afterNested.json',
    '__tests__/__fixtures__/resultNestedPlain.txt',
  ],
];

const executeTests = (testData, outputFormat) => {
  it.each(testData)(
    '.genDiff(%s, %s)',
    (oldFilePath, newFilePath, correctFilePath) => {
      const expected = fs.readFileSync(correctFilePath, 'utf8');
      const received = genDiff(oldFilePath, newFilePath, outputFormat);
      expect(received).toEqual(expected);
    },
  );
};

describe('GenDiff Flat Config Files', () => {
  executeTests(testFlatConfigFilesData, '');
});

describe('GenDiff Nested Config Files', () => {
  executeTests(testNestedConfigFilesData, '');
});

describe('GenDiff Plain Output', () => {
  executeTests(testPlainOutputData, 'plain');
});
