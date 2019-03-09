import _ from 'lodash';

const tab = num => '  '.repeat(num);

const addQuotes = str => `"${str}"`;

const isNumeric = str => !Number.isNaN(Number(str));

const renderValue = (value, level) => {
  if (typeof value === 'string') {
    return isNumeric(value) ? `${value}` : addQuotes(value);
  }
  if (typeof value === 'undefined') {
    return 'null';
  }
  if (_.isObject(value)) {
    const str = Object.keys(value).map(
      key => `${tab(level + 2)}"${key}": ${renderValue(value[key])}`,
    ).join(',\n');
    return `{\n${str}\n${tab(level + 1)}}`;
  }
  return `${value}`;
};

const renderJson = (diff, level = 1) => (
  diff.map((entry) => {
    const renderChildren = () => {
      if (!entry.children) {
        return null;
      }
      return [
        '{',
        `${renderJson(entry.children, level + 2).join(',\n')}`,
        `${tab(level + 1)}}`].join('\n');
    };

    return [
      `${tab(level)}${addQuotes(entry.name)}: {`,
      `${tab(level + 1)}"type": ${addQuotes(entry.type)},`,
      `${tab(level + 1)}"oldValue": ${renderValue(entry.oldValue, level)},`,
      `${tab(level + 1)}"newValue": ${renderValue(entry.newValue, level)},`,
      `${tab(level + 1)}"children": ${renderChildren()}`,
      `${tab(level)}}`].join('\n');
  })
);

export default diff => `{\n${renderJson(diff).join(',\n')}\n}`;
