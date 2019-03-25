import fs from 'fs';
import { promisify } from 'util';

const asyncReadFile = promisify(fs.readFile);

const extract = async (filePath, parser) => {
  if (!filePath) {
    throw new Error('Requires a file path to process.');
  }

  try {
    const fileData = await asyncReadFile(filePath, 'utf-8');

    if (fileData === '') {
      throw new Error('Empty file, nothing to process.');
    }

    const data = parser(fileData);

    return JSON.stringify(data);
  } catch (err) {
    throw err;
  }
};

export default extract;
