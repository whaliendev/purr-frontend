export function isObject(value) {
  return typeof value === 'object' && value instanceof Object;
}

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('deep clone error');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}