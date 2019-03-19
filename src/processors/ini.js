import fs from 'fs';
import ini from 'ini';
import { promisify } from 'util';

import extract from '../utils/extract';
import transform from '../utils/transform';

const asyncWriteFile = promisify(fs.writeFile);

const handler = async (filePath, key) => {
  try {
    const extracted = await extract(filePath, ini.parse);

    if (extracted.includes('$merge')) {
      throw new Error('INI config does not support $merge settings.');
    }

    const transformed = await transform(extracted, key, filePath, handler);

    return transformed;
  } catch (err) {
    throw err;
  }
};

const write = async (outputFile, compiled) => {
  try {
    await asyncWriteFile(outputFile, ini.stringify(compiled), 'utf-8');

    return { outputFile };
  } catch (err) {
    throw err;
  }
};

const dump = compiled => {
  try {
    const content = ini.stringify(compiled);

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
