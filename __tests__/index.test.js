import fs from 'fs';
import genDiff from '../src';

describe('GenDiff', () => {
  const oldConfigFilePathJSON = '__tests__/__fixtures__/before.json';
  const newConfigFilePathJSON = '__tests__/__fixtures__/after.json';

  const oldConfigFilePathYAML = '__tests__/__fixtures__/before.yaml';
  const newConfigFilePathYAML = '__tests__/__fixtures__/after.yaml';

  const oldConfigFilePathINI = '__tests__/__fixtures__/before.ini';
  const newConfigFilePathINI = '__tests__/__fixtures__/after.ini';

  const correctDiffFilePath = '__tests__/__fixtures__/result.txt';

  const expected = fs.readFileSync(correctDiffFilePath, 'utf8');

  it('flat json files', () => {
    const received = genDiff(oldConfigFilePathJSON, newConfigFilePathJSON);
    expect(received).toEqual(expected);
  });

  it('flat yaml files', () => {
    const received = genDiff(oldConfigFilePathYAML, newConfigFilePathYAML);
    expect(received).toEqual(expected);
  });

  it('flat ini files', () => {
    const received = genDiff(oldConfigFilePathINI, newConfigFilePathINI);
    expect(received).toEqual(expected);
  });
});
