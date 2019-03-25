/**
 * @function hasOwnProperty
 * @description Utility to avoid unintended behaviours
 *
 * @param {Object} obj
 * @param {String} key
 *
 * @returns {Boolean}
 */
export const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

/**
 * @function clean
 * @description Cleans an object from forbidden values
 * By default, forbidden values are [undefined, null, false]
 *
 * @param {Object} rawObject
 * @param {Object} options
 *
 * @returns {Object}
 */
export const clean = (rawObject, options = {}) => {
  const defaults = {
    _undefined: false,
    _null: false,
    _false: false,
    ...options,
  };
  const values = {
    _undefined: undefined,
    _null: null,
    _false: false,
  };

  const forbidden = Object.keys(defaults).reduce((acc, option) => {
    if (!defaults[option]) {
      acc.push(values[option]);
    }

    return acc;
  }, []);

  const isAllowed = (object, key) => !forbidden.includes(object[key]);

  const newObj = Object.keys(rawObject).reduce((obj, key) => {
    if (isAllowed(rawObject, key)) {
      obj[key] = rawObject[key];
    }

    return obj;
  }, {});

  return newObj;
};
