/* global describe afterEach it expect */
import fs from 'fs';
import path from 'path';

import compile from '.';

const TEST_DATA_DIR = path.resolve(__dirname, '../test/data');

describe('Compile function', () => {
  const targetFiles = {
    YAML: `${__dirname}/parsed.yaml`,
    JSON: `${__dirname}/parsed.json`,
    INI: `${__dirname}/parsed.ini`,
  };

  it('should throw error when not receiving an input file', async () => {
    try {
      await compile();
    } catch (error) {
      expect(error.message).toEqual('No template file provided');
    }
  });

  it('should throw error when input file does not exist', async () => {
    try {
      await compile(`${__dirname}/does-not-exist.yaml`);
    } catch (error) {
      expect(error.message).toEqual(`Path does not exist: ${__dirname}/does-not-exist.yaml`);
    }
  });

  it('should throw error when file extension is not present', async () => {
    try {
      await compile(`${__dirname}/does-not-exist`);
    } catch (error) {
      expect(error.message).toEqual('No valid config found');
    }
  });

  describe('With files', () => {
    describe('JSON', () => {
      afterEach(() => {
        fs.unlinkSync(targetFiles.JSON);
      });

      it('should throw error when processor.process throws an error with a JSON file', async () => {
        fs.writeFileSync(targetFiles.JSON, 'malformed json', 'utf-8');

        try {
          await compile(targetFiles.JSON);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should parse correctly a JSON template', async () => {
        const results = await compile(`${TEST_DATA_DIR}/file.json`, targetFiles.JSON);

        expect(results.outputFile).toEqual(targetFiles.JSON);
      });
    });

    describe('YAML', () => {
      afterEach(() => {
        fs.unlinkSync(targetFiles.YAML);
      });

      it('should throw error when processor.process throws an error with a YAML/YML file', async () => {
        fs.writeFileSync(targetFiles.YAML, 'malformed yaml', 'utf-8');

        try {
          await compile(targetFiles.YAML);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should parse correctly a YAML/YML template', async () => {
        const results = await compile(`${TEST_DATA_DIR}/file.yaml`, targetFiles.YAML);

        expect(results.outputFile).toEqual(targetFiles.YAML);
      });
    });

    describe('INI', () => {
      afterEach(() => {
        fs.unlinkSync(targetFiles.INI);
      });

      it('should throw error when processor.process throws an error with an INI file', async () => {
        fs.writeFileSync(targetFiles.INI, 'malformed ini', 'utf-8');

        try {
          await compile(targetFiles.INI);
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
        }
      });

      it('should parse correctly an INI template', async () => {
        const results = await compile(`${TEST_DATA_DIR}/file.ini`, targetFiles.INI);

        expect(results.outputFile).toEqual(targetFiles.INI);
      });
    });
  });
});
