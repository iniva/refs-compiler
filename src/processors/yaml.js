import yaml from 'node-yaml';

import extract from '../utils/extract';
import transform from '../utils/transform';

const options = {
  encoding: 'utf8',
  schema: yaml.schema.defaultFull,
};

const parser = data => yaml.parse(data, options);

const process = async (filePath, key) => {
  try {
    const extracted = await extract(filePath, parser);
    const transfromed = await transform(extracted, key, filePath, process);

    return transfromed;
  } catch (err) {
    throw err;
  }
};

const write = async (outputFile, compiled) => {
  yaml.write(outputFile, compiled, options, err => {
    if (err) {
      throw err;
    }

    return { outputFile };
  });
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
  process,
  dump,
  write,
};
