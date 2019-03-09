import _ from 'lodash';

const propertyActions = [
  {
    type: 'added',
    check: (oldObj, newObj, key) => (
      !_.has(oldObj, key) && _.has(newObj, key)
    ),
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'deleted',
    check: (oldObj, newObj, key) => (
      _.has(oldObj, key) && !_.has(newObj, key)
    ),
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'nested',
    check: (oldObj, newObj, key) => (
      _.isObject(oldObj[key]) && _.isObject(newObj[key])
    ),
    process: (oldValue, newValue, fn) => ({ children: fn(oldValue, newValue) }),
  },
  {
    type: 'changed',
    check: (oldObj, newObj, key) => (
      oldObj[key] !== newObj[key]
    ),
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'unchanged',
    check: (oldObj, newObj, key) => (
      oldObj[key] === newObj[key]
    ),
    process: (oldValue, newValue) => ({ oldValue, newValue }),
  },
];

const getPropertyAction = (oldObj, newObj, key) => (
  propertyActions.find(({ check }) => check(oldObj, newObj, key))
);

const buildDiffAst = (oldConfig, newConfig) => {
  const keys = _.union(_.keys(oldConfig), _.keys(newConfig));

  return keys.map((key) => {
    const { type, process } = getPropertyAction(oldConfig, newConfig, key);
    const rest = process(oldConfig[key], newConfig[key], buildDiffAst);
    return { name: key, type, ...rest };
  });
};

export default buildDiffAst;
