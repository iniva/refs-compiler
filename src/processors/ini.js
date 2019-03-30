import fs from 'fs';
import ini from 'ini';
import { promisify } from 'util';

import extract from '../utils/extract';
import transform from '../utils/transform';

const asyncWriteFile = promisify(fs.writeFile);

const handler = async (filePath, key) => {
  const extracted = await extract(filePath, ini.parse);

  if (extracted.includes('$merge')) {
    throw new Error('INI config does not support $merge settings.');
  }

  const transformed = await transform(extracted, key, filePath, handler);

  return transformed;
};

const write = async (outputFile, compiled) => {
  await asyncWriteFile(outputFile, ini.stringify(compiled), 'utf-8');

  return { outputFile };
};

const dump = compiled => {
  const content = ini.stringify(compiled);

  return { content };
};

export {
  handler,
  dump,
  write,
};
