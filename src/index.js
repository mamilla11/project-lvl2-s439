import fs from 'fs';
import path from 'path';
import parse from './parser';
import buildDiffAst from './differ';
import render from './renderers';

export default (oldConfigFilePath, newConfigFilePath, outputFormat) => {
  const oldFileExt = path.extname(oldConfigFilePath);
  const newFileExt = path.extname(newConfigFilePath);

  const oldFileContent = fs.readFileSync(oldConfigFilePath, 'utf8');
  const newFileContent = fs.readFileSync(newConfigFilePath, 'utf8');

  const oldConfig = parse(oldFileExt, oldFileContent);
  const newConfig = parse(newFileExt, newFileContent);

  const diff = buildDiffAst(oldConfig, newConfig);
  return render(diff, outputFormat);
};
