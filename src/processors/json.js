import fs from 'fs';
import { promisify } from 'util';

import extract from '../utils/extract';
import transform from '../utils/transform';

const asyncWrite = promisify(fs.writeFile);

const handler = async (filePath, key) => {
  try {
    const extracted = await extract(filePath, JSON.parse);
    const transformed = await transform(extracted, key, filePath, handler);

    return transformed;
  } catch (err) {
    throw err;
  }
};

const write = async (outputFile, compiled) => {
  try {
    await asyncWrite(outputFile, compiled, 'utf-8');

    return { outputFile };
  } catch (err) {
    throw err;
  }
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
  handler,
  dump,
  write,
};
