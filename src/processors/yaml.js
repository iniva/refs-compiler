import yaml from 'node-yaml';
import { promisify } from 'util';

import extract from '../utils/extract';
import transform from '../utils/transform';

const options = {
  encoding: 'utf8',
  schema: yaml.schema.defaultFull,
};
const asyncWrite = promisify(yaml.write);

const parser = data => yaml.parse(data, options);

const handler = async (filePath, key) => {
  try {
    const extracted = await extract(filePath, parser);
    const transformed = await transform(extracted, key, filePath, handler);

    return transformed;
  } catch (err) {
    throw err;
  }
};

const write = async (outputFile, compiled) => {
  try {
    await asyncWrite(outputFile, compiled, options);

    return { outputFile };
  } catch (err) {
    throw err;
  }
};

const dump = compiled => {
  try {
    const content = yaml.dump(compiled);

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
