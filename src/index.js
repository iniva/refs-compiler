import path from 'path';
import fs from 'fs';

import Processor from './processor';

const compile = async (inputFile, outputFile) => {
  if (!inputFile) {
    throw new Error('No template file provided');
  }

  const fileExtension = inputFile.split('.').pop();

  if (!['yaml', 'yml', 'json', 'ini'].includes(fileExtension)) {
    throw new Error('No valid config found');
  }

  const processor = (new Processor()).getProcessor(fileExtension);
  const inputFilePath = path.resolve(inputFile);

  try {
    fs.statSync(inputFilePath);
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
      const outputFilePath = path.resolve(outputFile);
      results = await processor.write(outputFilePath, compiled);

      return {
        outputFile: results.outputFile || null,
        content: results.content || null,
      };
    }

    results = processor.dump(compiled);

    return {
      outputFile: results.outputFile || null,
      content: results.content || null,
    };
  } catch (err) {
    throw new Error(`An error occurred while parsing JSON string: ${err.message}`);
  }
};

export default compile;
