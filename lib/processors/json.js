"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.handler = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const asyncWrite = (0, _util.promisify)(_fs.default.writeFile);

const handler = async (filePath, key) => {
  const extracted = await (0, _extract.default)(filePath, JSON.parse);
  const transformed = await (0, _transform.default)(extracted, key, filePath, handler);
  return transformed;
};

exports.handler = handler;

const write = async (outputFile, compiled) => {
  await asyncWrite(outputFile, JSON.stringify(compiled), 'utf-8');
  return {
    outputFile
  };
};

exports.write = write;

const dump = compiled => {
  const content = JSON.stringify(compiled);
  return {
    content
  };
};

exports.dump = dump;