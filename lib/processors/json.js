"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.process = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncWrite = (0, _util.promisify)(_fs.default.writeFile);

const process = async (filePath, key) => {
  try {
    const extracted = await (0, _extract.default)(filePath, JSON.parse);
    const transfromed = await (0, _transform.default)(extracted, key, filePath, process);
    return transfromed;
  } catch (err) {
    throw err;
  }
};

exports.process = process;

const write = async (outputFile, compiled) => {
  try {
    await asyncWrite(outputFile, compiled, 'utf-8');
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
    const content = JSON.stringify(compiled);
    return {
      content
    };
  } catch (err) {
    throw err;
  }
};

exports.dump = dump;