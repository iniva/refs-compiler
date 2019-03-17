"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.process = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _ini = _interopRequireDefault(require("ini"));

var _util = require("util");

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const process = async (filePath, key) => {
  try {
    const extracted = await (0, _extract.default)(filePath, _ini.default.parse);

    if (extracted.includes('$merge')) {
      throw new Error('INI config does not support $merge settings.');
    }

    const transfromed = await (0, _transform.default)(extracted, key, filePath, process);
    return transfromed;
  } catch (err) {
    throw err;
  }
};

exports.process = process;

const write = async (outputFile, compiled) => {
  try {
    await asyncWriteFile(outputFile, _ini.default.stringify(compiled), 'utf-8');
    return {
      outputFile
    };
  } catch (err) {
    throw err;
  }
};

exports.write = write;

const dump = compiled => {
  try {
    const content = _ini.default.stringify(compiled);

    return {
      content
    };
  } catch (err) {
    throw err;
  }
};

exports.dump = dump;