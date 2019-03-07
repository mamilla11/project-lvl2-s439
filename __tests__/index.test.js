import fs from 'fs';
import genDiff from '../src';

const flatConfigFilesTestPaths = [
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
  ]
];

const nestedConfigFilesTestPaths = [
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
  ]
];

const executeTests = (testData) => {
  it.each(testData)(
    '.genDiff(%s, %s)',
    (oldFilePath, newFilePath, correctFilePath) => {
      const expected = fs.readFileSync(correctFilePath, 'utf8');
      const received = genDiff(oldFilePath, newFilePath);
      expect(received).toEqual(expected);
    },
  );
};

describe('GenDiff Flat', () => {
  executeTests(flatConfigFilesTestPaths);
});

describe('GenDiff Nested', () => {
  executeTests(nestedConfigFilesTestPaths);
});
