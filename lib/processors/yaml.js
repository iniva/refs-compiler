"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.process = void 0;

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

var _util = require("util");

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  encoding: 'utf8',
  schema: _nodeYaml.default.schema.defaultFull
};
const asyncWrite = (0, _util.promisify)(_nodeYaml.default.write);

const parser = data => _nodeYaml.default.parse(data, options);

const process = async (filePath, key) => {
  try {
    const extracted = await (0, _extract.default)(filePath, parser);
    const transfromed = await (0, _transform.default)(extracted, key, filePath, process);
    return transfromed;
  } catch (err) {
    throw err;
  }
};

exports.process = process;

const write = async (outputFile, compiled) => {
  try {
    await asyncWrite(outputFile, compiled, options);
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
    const content = _nodeYaml.default.dump(compiled);

    return {
      content
    };
  } catch (err) {
    throw err;
  }
};

exports.dump = dump;