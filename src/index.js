import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';

const processConfigKey = (key, oldConfig, newConfig) => {
  const oldHasKey = _.has(oldConfig, key);
  const newHasKey = _.has(newConfig, key);
  if (oldHasKey && !newHasKey) {
    return `- ${key}: ${oldConfig[key]}`;
  }
  if (!oldHasKey && newHasKey) {
    return `+ ${key}: ${newConfig[key]}`;
  }
  if (newConfig[key] === oldConfig[key]) {
    return `  ${key}: ${newConfig[key]}`;
  }
  return `+ ${key}: ${newConfig[key]}\n- ${key}: ${oldConfig[key]}`;
};

const genDiff = (oldConfigFilePath, newConfigFilePath) => {
  const filePaths = [oldConfigFilePath, newConfigFilePath];

  const [oldFileExt, newFileExt] = filePaths.map(
    filePath => path.extname(filePath),
  );

  const [oldFileContent, newFileContent] = filePaths.map(
    filePath => fs.readFileSync(filePath, 'utf8'),
  );

  const oldConfig = parse(oldFileExt, oldFileContent);
  const newConfig = parse(newFileExt, newFileContent);

  const keys = _.union(_.keys(oldConfig), _.keys(newConfig));

  return keys.map(key => processConfigKey(key, oldConfig, newConfig)).join('\n');
};

export default genDiff;
