/* global describe it expect */
import path from 'path';

import extract from './extract';

const TEST_DATA_DIR = path.resolve(__dirname, '../../test/data');

describe('Utils: Extract', () => {
  it('should throw if not receiving a file path', async () => {
    await expect(extract())
      .rejects
      .toThrow('Requires a file path to process.');
  });

  it('should throw when receiving a file path to a file that does not exist', async () => {
    await expect(extract('invalid/path'))
      .rejects
      .toThrow('ENOENT: no such file or directory, open \'invalid/path\'');
  });

  it('should throw when the target file is empty', async () => {
    await expect(extract(`${TEST_DATA_DIR}/empty.json`))
      .rejects
      .toThrow('Empty file, nothing to process.');
  });

  it('should throw when not receiving a parser function', async () => {
    await expect(extract(`${TEST_DATA_DIR}/file.json`))
      .rejects
      .toThrow('parser is not a function');
  });

  it('should extract and parse the file content', async () => {
    const extracted = await extract(`${TEST_DATA_DIR}/file.json`, JSON.parse);

    expect(typeof extracted).toEqual('string');
  });
});
