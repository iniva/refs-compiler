"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.process = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const process = (filePath, key) => (0, _extract.default)(filePath, JSON.parse).then(dataString => (0, _transform.default)(dataString, key, filePath, process));

exports.process = process;

const write = (outputFile, compiled) => new Promise((resolve, reject) => {
  _fs.default.writeFile(outputFile, compiled, 'utf-8', err => {
    if (err) {
      return reject(err);
    }

    return resolve({
      outputFile
    });
  });
});

exports.write = write;

const dump = compiled => new Promise(resolve => {
  resolve({
    content: JSON.stringify(compiled)
  });
});

exports.dump = dump;