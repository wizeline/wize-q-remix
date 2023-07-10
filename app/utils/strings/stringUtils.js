import { HTTP_PREFIX, TRUNCATE_ENDING } from '../utilConstants';

export function stripNewLines(str) {
  // Replace series of newline characters for a single space
  return str.replace(/[\r\n]+/g, ' ');
}

/**
 * Truncate string to maxLength characters long
 * Check if the string begins with a http[s] link longer that maxLength
 *
 * @param {string} str
 * @param {number} maxLength
 */
export function truncate(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  const indexOfLastSpace = str.lastIndexOf(' ', maxLength);
  if (indexOfLastSpace !== -1) {
    return `${str.substring(0, indexOfLastSpace)} ${TRUNCATE_ENDING}`;
  }
  if (maxLength > HTTP_PREFIX.length
    && str.substring(0, HTTP_PREFIX.length) === HTTP_PREFIX) {
    return TRUNCATE_ENDING;
  }
  return `${str.substring(0, maxLength)} ${TRUNCATE_ENDING}`;
}

/**
 * Return the size on the string in bytes.
 *
 * @param {string} str String to get the size in bytes from.
 *
 * @returns {number} The size in bytes.
 */
export function getStringSizeInBytes(str) {
  if (typeof str !== 'string') {
    throw new TypeError(`'str' value of (${str}) must be a string, not ${typeof str}.`);
  }

  return Buffer.from(str).length;
}

/**
 * If the string is bigger than the maximum size in bytes, it truncates the
 * string and add ellipses to the end of the string.
 *
 * @param {string} str String to be truncated.
 * @param {number} maxSizeInBytes Maximum string size in bytes.
 * @param {string} suffix Suffix to be added to the string if truncation is needed.
 *
 * @returns {string} Truncated string.
 */
export function truncateStringByBytes(str, maxSizeInBytes, suffix = '...') {
  const buffer = Buffer.from(str);

  if (buffer.length <= maxSizeInBytes) {
    return buffer.toString();
  }

  const truncatedString = buffer.subarray(0, maxSizeInBytes - suffix.length);

  return `${truncatedString}${suffix}`;
}
