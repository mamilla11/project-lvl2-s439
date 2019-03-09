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

const renderDefault = (diff, level = 0) => (
  diff.map((entry) => {
    const { ...e } = entry;

    const tabs = tab(level);

    if (e.type === 'added') {
      return `${tabs}+ ${e.name}: ${renderValue(e.newValue, level)}`;
    }
    if (e.type === 'deleted') {
      return `${tabs}- ${e.name}: ${renderValue(e.oldValue, level)}`;
    }
    if (e.type === 'unchanged') {
      return `${tabs}  ${e.name}: ${renderValue(e.newValue, level)}`;
    }
    if (e.type === 'changed') {
      return [
        `${tabs}+ ${e.name}: ${renderValue(e.newValue, level)}`,
        `${tabs}- ${e.name}: ${renderValue(e.oldValue, level)}`,
      ].join('\n');
    }
    if (e.type === 'nested') {
      return [
        `${tabs}  ${e.name}: {`,
        `${renderDefault(e.children, level + 1).join('\n')}`,
        `${tabs}  }`].join('\n');
    }
    return '';
  })
);

export default diff => renderDefault(diff).join('\n');
