"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const extract = (filePath, parser) => new Promise((resolve, reject) => {
  if (!filePath) {
    return reject(new Error('Requires a file path to process.'));
  }

  try {
    const fileData = _fs.default.readFileSync(filePath, 'utf-8');

    if (fileData === '') {
      return reject(new Error('Empty file, nothing to process.'));
    }

    const data = parser(fileData);
    return resolve(JSON.stringify(data));
  } catch (err) {
    return reject(err);
  }
});

var _default = extract;
exports.default = _default;