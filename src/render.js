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

const renderDefault = diff => (
  diff.reduce((acc, entry) => {
    const { ...e } = entry;

    const tabs = tab(e.level);

    switch (e.status) {
      case entryStatus.ADDED:
        return [...acc, `${tabs}+ ${e.name}: ${renderValue(e.newValue, e.level)}`];
      case entryStatus.DELETED:
        return [...acc, `${tabs}- ${e.name}: ${renderValue(e.oldValue, e.level)}`];
      case entryStatus.UNCHANGED:
        return [...acc, `${tabs}  ${e.name}: ${renderValue(e.newValue, e.level)}`];
      case entryStatus.CHANGED:
        return [
          ...acc,
          `${tabs}+ ${e.name}: ${renderValue(e.newValue, e.level)}`,
          `${tabs}- ${e.name}: ${renderValue(e.oldValue, e.level)}`,
        ];
      case entryStatus.NESTED:
        return [...acc, `${tabs}  ${e.name}: {`, `${renderDefault(e.children)}`, `${tabs}  }`];
      default:
        return acc;
    }
  }, []).join('\n')
);

const renderPlain = (diff) => {

};

export default (diff, outputFormat) => {
  switch(outputFormat) {
    case 'plain':
      return renderPlain(diff);
    default:
      return renderDefault(diff);
  }
};
