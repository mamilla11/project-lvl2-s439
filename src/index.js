import fs from 'fs';
import _ from 'lodash';

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
  const oldConfig = JSON.parse(fs.readFileSync(oldConfigFilePath, 'utf8'));
  const newConfig = JSON.parse(fs.readFileSync(newConfigFilePath, 'utf8'));

  const keys = _.union(_.keys(oldConfig), _.keys(newConfig));

  return keys.map(key => processConfigKey(key, oldConfig, newConfig)).join('\n');
};

export default genDiff;
