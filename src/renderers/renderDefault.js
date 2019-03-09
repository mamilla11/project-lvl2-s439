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

const renderDefault = (diff, level) => (
  diff.reduce((acc, entry) => {
    const { ...e } = entry;

    const tabs = tab(level);

    switch (e.type) {
      case 'added':
        return [...acc, `${tabs}+ ${e.name}: ${renderValue(e.newValue, level)}`];
      case 'deleted':
        return [...acc, `${tabs}- ${e.name}: ${renderValue(e.oldValue, level)}`];
      case 'unchanged':
        return [...acc, `${tabs}  ${e.name}: ${renderValue(e.newValue, level)}`];
      case 'changed':
        return [
          ...acc,
          `${tabs}+ ${e.name}: ${renderValue(e.newValue, level)}`,
          `${tabs}- ${e.name}: ${renderValue(e.oldValue, level)}`,
        ];
      case 'nested':
        return [...acc, `${tabs}  ${e.name}: {`, `${renderDefault(e.children, level + 1)}`, `${tabs}  }`];
      default:
        return acc;
    }
  }, []).join('\n')
);

export default diff => renderDefault(diff, 0);
