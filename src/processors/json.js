import fs from 'fs';

import extract from '../utils/extract';
import transform from '../utils/transform';

const process = async (filePath, key) => {
  try {
    const extracted = await extract(filePath, JSON.parse);
    const transfromed = await transform(extracted, key, filePath, process);

    return transfromed;
  } catch (err) {
    throw err;
  }
};

const write = async (outputFile, compiled) => {
  fs.writeFile(outputFile, compiled, 'utf-8', err => {
    if (err) {
      throw err;
    }

    return { outputFile };
  });
};

const dump = compiled => {
  try {
    const content = JSON.stringify(compiled);

    return { content };
  } catch (err) {
    throw err;
  }
};

export {
  process,
  dump,
  write,
};
