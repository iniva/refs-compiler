"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.process = void 0;

var _nodeYaml = _interopRequireDefault(require("node-yaml"));

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const options = {
  encoding: 'utf8',
  schema: _nodeYaml.default.schema.defaultFull
};

const parser = data => _nodeYaml.default.parse(data, options);

const process = (filePath, key) => (0, _extract.default)(filePath, parser).then(dataString => (0, _transform.default)(dataString, key, filePath, process));

exports.process = process;

const write = (outputFile, compiled) => new Promise((resolve, reject) => {
  _nodeYaml.default.write(outputFile, compiled, options, err => {
    if (err) {
      return reject(err);
    }

    return resolve({
      outputFile
    });
  });
});

exports.write = write;

const dump = compiled => new Promise((resolve, reject) => {
  try {
    resolve({
      content: _nodeYaml.default.dump(compiled)
    });
  } catch (err) {
    reject(err);
  }
});

exports.dump = dump;