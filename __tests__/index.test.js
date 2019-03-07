import fs from 'fs';
import genDiff from '../src';

describe('GenDiff Flat', () => {
  const oldConfigFilePathJSON = '__tests__/__fixtures__/beforeFlat.json';
  const newConfigFilePathJSON = '__tests__/__fixtures__/afterFlat.json';

  const oldConfigFilePathYAML = '__tests__/__fixtures__/beforeFlat.yaml';
  const newConfigFilePathYAML = '__tests__/__fixtures__/afterFlat.yaml';

  const oldConfigFilePathINI = '__tests__/__fixtures__/beforeFlat.ini';
  const newConfigFilePathINI = '__tests__/__fixtures__/afterFlat.ini';

  const correctDiffFilePath = '__tests__/__fixtures__/resultFlat.txt';

  const expected = fs.readFileSync(correctDiffFilePath, 'utf8');

  it('json files', () => {
    const received = genDiff(oldConfigFilePathJSON, newConfigFilePathJSON);
    expect(received).toEqual(expected);
  });

  it('yaml files', () => {
    const received = genDiff(oldConfigFilePathYAML, newConfigFilePathYAML);
    expect(received).toEqual(expected);
  });

  it('ini files', () => {
    const received = genDiff(oldConfigFilePathINI, newConfigFilePathINI);
    expect(received).toEqual(expected);
  });
});

describe('GenDiff Nested', () => {
  const oldConfigFilePathJSON = '__tests__/__fixtures__/beforeNested.json';
  const newConfigFilePathJSON = '__tests__/__fixtures__/afterNested.json';

  // const oldConfigFilePathYAML = '__tests__/__fixtures__/beforeNested.yaml';
  // const newConfigFilePathYAML = '__tests__/__fixtures__/afterNested.yaml';

  // const oldConfigFilePathINI = '__tests__/__fixtures__/beforeNested.ini';
  // const newConfigFilePathINI = '__tests__/__fixtures__/afterNested.ini';

  const correctDiffFilePath = '__tests__/__fixtures__/resultNested.txt';

  const expected = fs.readFileSync(correctDiffFilePath, 'utf8');

  it('json files', () => {
    const received = genDiff(oldConfigFilePathJSON, newConfigFilePathJSON);
    expect(received).toEqual(expected);
  });

  // it('yaml files', () => {
  //   const received = genDiff(oldConfigFilePathYAML, newConfigFilePathYAML);
  //   expect(received).toEqual(expected);
  // });

  // it('ini files', () => {
  //   const received = genDiff(oldConfigFilePathINI, newConfigFilePathINI);
  //   expect(received).toEqual(expected);
  // });
});
