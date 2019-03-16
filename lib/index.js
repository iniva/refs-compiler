"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _processor = _interopRequireDefault(require("./processor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const compile = async (inputFile, outputFile) => new Promise((resolve, reject) => {
  try {
    if (!inputFile) {
      return reject(new Error('No template file provided'));
    }

    const fileExtension = inputFile.split('.').pop();

    if (!['yaml', 'yml', 'json', 'ini'].includes(fileExtension)) {
      return reject(new Error('No valid config found'));
    }

    const processor = _processor.default.getProcessor(fileExtension);

    const inputFilePath = _path.default.resolve(inputFile);

    try {
      _fs.default.statSync(inputFilePath);
    } catch (err) {
      return reject(new Error(`Path does not exist: ${inputFilePath}`));
    }

    return processor.process(inputFilePath).then(contentPkg => {
      try {
        const compiled = JSON.parse(contentPkg.dataString);

        if (outputFile) {
          const outputFilePath = _path.default.resolve(outputFile);

          return processor.write(outputFilePath, compiled);
        }

        return processor.dump(compiled);
      } catch (err) {
        return reject(new Error(`An error occurred while parsing JSON string: ${err.message}`));
      }
    }).then(results => {
      resolve({
        outputFile: results.outputFile || null,
        content: results.content || null
      });
    }).catch(err => {
      reject(err);
    });
  } catch (err) {
    return reject(err);
  }
});

var _default = compile;
exports.default = _default;