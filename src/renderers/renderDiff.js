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

    switch (e.type) {
      case 'added':
        return `${tabs}+ ${e.name}: ${renderValue(e.newValue, level)}`;
      case 'deleted':
        return `${tabs}- ${e.name}: ${renderValue(e.oldValue, level)}`;
      case 'unchanged':
        return `${tabs}  ${e.name}: ${renderValue(e.newValue, level)}`;
      case 'changed':
        return [
          `${tabs}+ ${e.name}: ${renderValue(e.newValue, level)}\n`
          + `${tabs}- ${e.name}: ${renderValue(e.oldValue, level)}`,
        ];
      case 'nested':
        return [
          `${tabs}  ${e.name}: {`,
          `${renderDefault(e.children, level + 1).join('\n')}`,
          `${tabs}  }`].join('\n');
      default: return '';
    }
  })
);

export default diff => renderDefault(diff).join('\n');
