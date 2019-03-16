"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.write = exports.dump = exports.process = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _ini = _interopRequireDefault(require("ini"));

var _extract = _interopRequireDefault(require("../utils/extract"));

var _transform = _interopRequireDefault(require("../utils/transform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const process = (filePath, key) => (0, _extract.default)(filePath, _ini.default.parse).then(dataString => {
  if (dataString.includes('$merge')) {
    return Promise.reject(new Error('INI config does not support $merge settings.'));
  }

  return (0, _transform.default)(dataString, key, filePath, process);
});

exports.process = process;

const write = (outputFile, compiled) => new Promise((resolve, reject) => {
  _fs.default.writeFile(outputFile, _ini.default.stringify(compiled), 'utf-8', err => {
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
      content: _ini.default.stringify(compiled)
    });
  } catch (err) {
    reject(err);
  }
});

exports.dump = dump;