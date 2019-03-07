import fs from 'fs';
import genDiff from '../src';

const filePaths = {
  flatTest: {
    JSONFilesTest: {
      oldConfigFile: '__tests__/__fixtures__/beforeFlat.json',
      newConfigFile: '__tests__/__fixtures__/afterFlat.json',
      correctDiffFile: '__tests__/__fixtures__/resultFlat.txt',
    },
    YAMLFilesTest: {
      oldConfigFile: '__tests__/__fixtures__/beforeFlat.yaml',
      newConfigFile: '__tests__/__fixtures__/afterFlat.yaml',
      correctDiffFile: '__tests__/__fixtures__/resultFlat.txt',
    },
    INIFilesTest: {
      oldConfigFile: '__tests__/__fixtures__/beforeFlat.ini',
      newConfigFile: '__tests__/__fixtures__/afterFlat.ini',
      correctDiffFile: '__tests__/__fixtures__/resultFlat.txt',
    },
  },

  nestedTest: {
    JSONFilesTest: {
      oldConfigFile: '__tests__/__fixtures__/beforeNested.json',
      newConfigFile: '__tests__/__fixtures__/afterNested.json',
      correctDiffFile: '__tests__/__fixtures__/resultNested.txt',
    },
    YAMLFilesTest: {
      oldConfigFile: '__tests__/__fixtures__/beforeNested.yaml',
      newConfigFile: '__tests__/__fixtures__/afterNested.yaml',
      correctDiffFile: '__tests__/__fixtures__/resultNested.txt',
    },
    INIFilesTest: {
      oldConfigFile: '__tests__/__fixtures__/beforeNested.ini',
      newConfigFile: '__tests__/__fixtures__/afterNested.ini',
      correctDiffFile: '__tests__/__fixtures__/resultNested.txt',
    },
  },
};

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

const prepareTestData = paths => Object.keys(paths).map(key => Object.values(paths[key]));

describe('GenDiff Flat', () => {
  const paths = filePaths.flatTest;
  executeTests(prepareTestData(paths));
});

describe('GenDiff Nested', () => {
  const paths = filePaths.nestedTest;
  executeTests(prepareTestData(paths));
});
