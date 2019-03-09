import _ from 'lodash';

const valueToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return `${value}`;
};

const buildPropertyName = (entryName, ancestors) => (
  `'${[...ancestors, entryName].join('.')}'`
);

const buildPropertyStatus = (entry) => {
  if (entry.type === 'deleted') {
    return 'was removed';
  }
  if (entry.type === 'added') {
    return `was added with value: ${valueToString(entry.newValue)}`;
  }
  if (entry.type === 'changed') {
    return `was updated. From ${valueToString(entry.oldValue)} to ${valueToString(entry.newValue)}`;
  }
  return '';
};

const stringify = (entry, ancestors) => {
  const propertyName = buildPropertyName(entry.name, ancestors);
  const propertyStatus = buildPropertyStatus(entry);
  return `Property ${propertyName} ${propertyStatus}`;
};

const renderPlain = (diff, ancestors) => (
  diff.filter(entry => entry.type !== 'unchanged')
    .map((entry) => {
      if (entry.type === 'nested') {
        return renderPlain(entry.children, [...ancestors, entry.name]);
      }
      return stringify(entry, ancestors);
    })
);

export default diff => _.flattenDeep(renderPlain(diff, [])).join('\n');
