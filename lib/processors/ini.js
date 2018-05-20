/*
* Processor: INI
*/
const fs = require('fs');
const ini = require('ini');
const { extract, transform } = require('../utils');

const process = (filePath, key) => extract(filePath, ini.parse)
  .then((dataString) => {
    if (dataString.includes('$merge')) {
      return Promise.reject(new Error('INI config does not support $merge settings.'));
    }

    return transform(dataString, key, filePath, process);
  });

const write = (outputFile, compiled) => new Promise((resolve, reject) => {
  fs.writeFile(outputFile, ini.stringify(compiled), 'utf-8', (err) => {
    if (err) {
      return reject(err);
    }

    return resolve({ outputFile });
  });
});

const dump = compiled => new Promise((resolve, reject) => {
  try {
    resolve({
      content: ini.stringify(compiled),
    });
  }
  catch (err) {
    reject(err);
  }
});

module.exports = {
  process,
  dump,
  write,
};
