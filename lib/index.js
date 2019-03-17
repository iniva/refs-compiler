"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _processor = _interopRequireDefault(require("./processor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const compile = async (inputFile, outputFile) => {
  if (!inputFile) {
    throw new Error('No template file provided');
  }

  const fileExtension = inputFile.split('.').pop();

  if (!['yaml', 'yml', 'json', 'ini'].includes(fileExtension)) {
    throw new Error('No valid config found');
  }

  const processor = new _processor.default().getProcessor(fileExtension);

  const inputFilePath = _path.default.resolve(inputFile);

  try {
    _fs.default.statSync(inputFilePath);
  } catch (err) {
    throw new Error(`Path does not exist: ${inputFilePath}`);
  }

  let contentPkg = null;

  try {
    contentPkg = await processor.process(inputFilePath);
  } catch (err) {
    throw err;
  }

  try {
    let results = null;
    const compiled = JSON.parse(contentPkg.dataString);

    if (outputFile) {
      const outputFilePath = _path.default.resolve(outputFile);

      results = await processor.write(outputFilePath, compiled);
      return {
        outputFile: results.outputFile || null,
        content: results.content || null
      };
    }

    results = processor.dump(compiled);
    return {
      outputFile: results.outputFile || null,
      content: results.content || null
    };
  } catch (err) {
    throw new Error(`An error occurred while parsing JSON string: ${err.message}`);
  }
};

var _default = compile;
exports.default = _default;