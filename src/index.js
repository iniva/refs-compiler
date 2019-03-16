/*
* Compile: main function
*/

const path = require('path');
const fs = require('fs');
const Processor = require('./processor');

const compile = async (inputFile, outputFile) => new Promise((resolve, reject) => {
  try {
    if (!inputFile) {
      return reject(new Error('No template file provided'));
    }

    const fileExtension = inputFile.split('.').pop();

    if (!['yaml', 'yml', 'json', 'ini'].includes(fileExtension)) {
      return reject(new Error('No valid config found'));
    }

    const processor = Processor.getProcessor(fileExtension);
    const inputFilePath = path.resolve(inputFile);

    try {
      fs.statSync(inputFilePath);
    } catch (err) {
      return reject(new Error(`Path does not exist: ${inputFilePath}`));
    }

    return processor.process(inputFilePath)
      .then(contentPkg => {
        try {
          const compiled = JSON.parse(contentPkg.dataString);

          if (outputFile) {
            const outputFilePath = path.resolve(outputFile);
            return processor.write(outputFilePath, compiled);
          }

          return processor.dump(compiled);
        } catch (err) {
          return reject(new Error(`An error occurred while parsing JSON string: ${err.message}`));
        }
      })
      .then(results => {
        resolve({
          outputFile: results.outputFile || null,
          content: results.content || null,
        });
      })
      .catch(err => {
        reject(err);
      });
  } catch (err) {
    return reject(err);
  }
});

module.exports = compile;
