import fs from 'fs';
import { promisify } from 'util';

import extract from '../utils/extract';
import transform from '../utils/transform';

const asyncWrite = promisify(fs.writeFile);

const handler = async (filePath, key) => {
  const extracted = await extract(filePath, JSON.parse);
  const transformed = await transform(extracted, key, filePath, handler);

  return transformed;
};

const write = async (outputFile, compiled) => {
  await asyncWrite(outputFile, JSON.stringify(compiled), 'utf-8');

  return { outputFile };
};

const dump = compiled => {
  const content = JSON.stringify(compiled);

  return { content };
};

export {
  handler,
  dump,
  write,
};
