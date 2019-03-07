import _ from 'lodash';
import entryStatus from './status';

const getConfigEntryStatus = (key, oldConfig, newConfig) => {
  const oldHasKey = _.has(oldConfig, key);
  const newHasKey = _.has(newConfig, key);

  if (oldHasKey && !newHasKey) {
    return entryStatus.DELETED;
  }
  if (!oldHasKey && newHasKey) {
    return entryStatus.ADDED;
  }

  const oldConfigEntryNested = oldConfig[key] instanceof Object;
  const newConfigEntryNested = newConfig[key] instanceof Object;

  if (oldConfigEntryNested && newConfigEntryNested) {
    return entryStatus.NESTED;
  }
  if (oldConfig[key] !== newConfig[key]) {
    return entryStatus.CHANGED;
  }
  return entryStatus.UNCHANGED;
};

const differ = (oldConfig, newConfig, level = 0) => {
  const keys = _.union(_.keys(oldConfig), _.keys(newConfig));

  return keys.reduce((acc, key) => {
    const configEntry = {
      name: key,
      oldValue: null,
      newValue: null,
      status: getConfigEntryStatus(key, oldConfig, newConfig),
      children: null,
      level,
    };

    if (configEntry.status === entryStatus.NESTED) {
      configEntry.children = differ(oldConfig[key], newConfig[key], level + 1);
    } else {
      configEntry.oldValue = oldConfig[key];
      configEntry.newValue = newConfig[key];
    }

    return [...acc, configEntry];
  }, []);
};

export default differ;
