import yaml from 'node-yaml';

import extract from '../utils/extract';
import transform from '../utils/transform';

const options = {
  encoding: 'utf8',
  schema: yaml.schema.defaultFull,
};

const parser = data => yaml.parse(data, options);

const process = (filePath, key) => extract(filePath, parser)
  .then(dataString => transform(dataString, key, filePath, process));

const write = (outputFile, compiled) => new Promise((resolve, reject) => {
  yaml.write(outputFile, compiled, options, err => {
    if (err) {
      return reject(err);
    }

    return resolve({ outputFile });
  });
});

const dump = compiled => new Promise((resolve, reject) => {
  try {
    resolve({
      content: yaml.dump(compiled),
    });
  } catch (err) {
    reject(err);
  }
});

export {
  process,
  dump,
  write,
};
