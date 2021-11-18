import logger from '@/plugins/logger';

export function isObject(value) {
  return (
    (typeof value === 'object' && value !== null) || value instanceof Object
  );
}

export function isString(value) {
  return typeof value === 'string' || value instanceof String;
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
  if (isNaN(parseFloat(num)) || isNaN(num - 0)) return '-';
  if (num > 1e20) return '999.9E ↑';
  if (num < 1) return num.toString();
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

export function ellipsisFormat(content, length = 10) {
  if (!isString(content))
    throw new Error('Make sure the first arg is a String');
  if (content.length <= length - 3) return content;
  return content.substr(0, length - 3) + '···';
}

/**
 * @see @link{https://stackoverflow.com/questions/946544/good-text-foreground-color-for-a-given-background-color/946734#946734}
 * @param rgb number[] an array of r, g, b value in decimal
 * @returns {string} 'light' or 'dark'
 */
export default function isLightOrDark(rgb = [0, 128, 255]) {
  const [r, g, b] = rgb;
  if (r * 0.299 + g * 0.587 + b * 0.114 > 186) {
    return 'light';
  } else {
    return 'dark';
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if the element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a
  // flash, so some of these are just precautions. However in
  // Internet Explorer the element is visible whilst the popup
  // box asking the user for permission for the web page to
  // copy to the clipboard.
  //

  // Place in the top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of the white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    logger.info('Copying text command was ' + msg);
  } catch (err) {
    return false;
  }

  document.body.removeChild(textArea);
  return true;
}

/**
 * @see @link{ https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript }
 * @param text
 */
export function copyTextToClipboard(text) {
  return new Promise((resolve) => {
    if (!navigator.clipboard) {
      resolve(fallbackCopyTextToClipboard(text));
    }
    navigator.clipboard.writeText(text).then(
      () => {
        resolve(true);
      },
      (err) => {
        logger.error('copy to clipboard failed, possible reason: ' + err);
        resolve(false);
      }
    );
  });
}
