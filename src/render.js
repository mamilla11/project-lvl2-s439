import entryStatus from './status';

const tab = num => '  '.repeat(num * 2);

const renderValue = (value, level) => {
  const isObject = value instanceof Object;
  if (!isObject) {
    return `${value}`;
  }

  const keys = Object.keys(value);
  const entries = keys.map(key => `${tab(level + 1)}  ${key}: ${value[key]}`);

  return ['{', ...entries, `${tab(level)}  }`].join('\n');
};

const render = diff => (
  diff.reduce((acc, entry) => {
    const {
      name,
      oldValue,
      newValue,
      status,
      children,
      level,
    } = entry;

    const tabs = tab(level);

    switch (status) {
      case entryStatus.ADDED:
        return [...acc, `${tabs}+ ${name}: ${renderValue(newValue, level)}`];
      case entryStatus.DELETED:
        return [...acc, `${tabs}- ${name}: ${renderValue(oldValue, level)}`];
      case entryStatus.UNCHANGED:
        return [...acc, `${tabs}  ${name}: ${renderValue(newValue, level)}`];
      case entryStatus.CHANGED:
        return [
          ...acc,
          `${tabs}+ ${name}: ${renderValue(newValue, level)}`,
          `${tabs}- ${name}: ${renderValue(oldValue, level)}`,
        ];
      case entryStatus.NESTED:
        return [...acc, `${tabs}  ${name}: {`, `${render(children)}`, `${tabs}  }`];
      default:
        return acc;
    }
  }, []).join('\n')
);

export default render;
