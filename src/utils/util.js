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

export function normalizeNum(num, trunc = true, digits = 1) {
  if (num > 1e20) return '999.9E ↑';
  if (num === 0) return '0';
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let left = 0,
    right = si.length;
  while (left < right) {
    let mid = (left + right) >> 1;
    if (num > si[mid].value) left = mid + 1;
    else right = mid;
  }
  left = si[left].value > num ? left - 1 : left;
  return trunc
    ? (num / si[left].value).toFixed(digits).replace(rx, '$1') + si[left].symbol
    : (num / si[left].value).toFixed(digits) + si[left].symbol;
}
