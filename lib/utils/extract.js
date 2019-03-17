"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncReadFile = (0, _util.promisify)(_fs.default.readFile);

const extract = async (filePath, parser) => {
  if (!filePath) {
    throw new Error('Requires a file path to process.');
  }

  try {
    const fileData = await asyncReadFile(filePath, 'utf-8');

    if (fileData === '') {
      throw new Error('Empty file, nothing to process.');
    }

    const data = parser(fileData);
    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
};

var _default = extract;
exports.default = _default;