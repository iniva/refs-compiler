import fs from 'fs';

import extract from '../utils/extract';
import transform from '../utils/transform';

const process = (filePath, key) => extract(filePath, JSON.parse)
  .then(dataString => transform(dataString, key, filePath, process));

const write = (outputFile, compiled) => new Promise((resolve, reject) => {
  fs.writeFile(outputFile, compiled, 'utf-8', err => {
    if (err) {
      return reject(err);
    }

    return resolve({ outputFile });
  });
});

const dump = compiled => new Promise(resolve => {
  resolve({
    content: JSON.stringify(compiled),
  });
});

export {
  process,
  dump,
  write,
};
