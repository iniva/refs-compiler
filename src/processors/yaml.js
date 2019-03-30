import fs from 'fs';
import { promisify } from 'util';
import yaml from 'js-yaml';

import extract from '../utils/extract';
import transform from '../utils/transform';

const options = {
  encoding: 'utf8',
  schema: yaml.DEFAULT_FULL_SCHEMA,
};
const asyncWrite = promisify(fs.writeFile);

const parser = data => yaml.safeLoad(data, options);

const handler = async (filePath, key) => {
  const extracted = await extract(filePath, parser);
  const transformed = await transform(extracted, key, filePath, handler);

  return transformed;
};

const write = async (outputFile, compiled) => {
  await asyncWrite(outputFile, yaml.dump(compiled, options));

  return { outputFile };
};

const dump = compiled => {
  const content = yaml.dump(compiled);

  return { content };
};

export {
  handler,
  dump,
  write,
};
