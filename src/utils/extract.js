import fs from 'fs';

const extract = (filePath, parser) => new Promise((resolve, reject) => {
  if (!filePath) {
    return reject(new Error('Requires a file path to process.'));
  }

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');

    if (fileData === '') {
      return reject(new Error('Empty file, nothing to process.'));
    }

    const data = parser(fileData);

    return resolve(JSON.stringify(data));
  } catch (err) {
    return reject(err);
  }
});

export default extract;
