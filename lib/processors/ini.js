"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.handler = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _ini = _interopRequireDefault(require("ini"));

var _util = require("util");

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncWriteFile = (0, _util.promisify)(_fs.default.writeFile);

const handler = async (filePath, key) => {
  const extracted = await (0, _extract.default)(filePath, _ini.default.parse);

  if (extracted.includes('$merge')) {
    throw new Error('INI config does not support $merge settings.');
  }

  const transformed = await (0, _transform.default)(extracted, key, filePath, handler);
  return transformed;
};

exports.handler = handler;

const write = async (outputFile, compiled) => {
  await asyncWriteFile(outputFile, _ini.default.stringify(compiled), 'utf-8');
  return {
    outputFile
  };
};

exports.write = write;

const dump = compiled => {
  const content = _ini.default.stringify(compiled);

  return {
    content
  };
};

exports.dump = dump;