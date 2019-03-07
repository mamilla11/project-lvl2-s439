import fs from 'fs';
import path from 'path';
import parse from './parser';
import differ from './differ';
import render from './render';

const genDiff = (oldConfigFilePath, newConfigFilePath, outputFormat) => {
  const filePaths = [oldConfigFilePath, newConfigFilePath];

  const [oldFileExt, newFileExt] = filePaths.map(
    filePath => path.extname(filePath),
  );

  const [oldFileContent, newFileContent] = filePaths.map(
    filePath => fs.readFileSync(filePath, 'utf8'),
  );

  const oldConfig = parse(oldFileExt, oldFileContent);
  const newConfig = parse(newFileExt, newFileContent);

  const diff = differ(oldConfig, newConfig);
  return render(diff, outputFormat);
};

export default genDiff;
