/* global describe beforeEach afterEach it expect */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';

import { version } from '../package';

const asyncExec = promisify(exec);
const COMPILER = './bin/compiler.js';
const TEST_DATA_DIR = path.resolve(__dirname, '../test/data');

describe('Compiler CLI', () => {
  let stdoutContent = null;

  beforeEach(() => {
    stdoutContent = `Usage: compiler [options] <file>

Options:
  -V, --version        output the version number
  -o, --output <file>  The path for the output file
  -h, --help           output usage information
`;
  });

  afterEach(() => {
    stdoutContent = null;
  });

  describe('options', () => {
    it('should display help with no arguments', async () => {
      const { error, stdout, stderr } = await asyncExec(`${COMPILER}`);

      expect(error).toEqual(undefined);
      expect(stdout).toEqual(stdoutContent);
      expect(stderr).toEqual('');
    });

    it('should display help with "-h"', async () => {
      const { error, stdout, stderr } = await asyncExec(`${COMPILER} -h`);

      expect(error).toEqual(undefined);
      expect(stdout).toEqual(stdoutContent);
      expect(stderr).toEqual('');
    });

    it('should display help with "--help"', async () => {
      const { error, stdout, stderr } = await asyncExec(`${COMPILER} --help`);

      expect(error).toEqual(undefined);
      expect(stdout).toEqual(stdoutContent);
      expect(stderr).toEqual('');
    });

    it('should display version with "-V"', async () => {
      const { error, stdout, stderr } = await asyncExec(`${COMPILER} -V`);

      expect(error).toEqual(undefined);
      expect(stdout).toEqual(`${version}\n`);
      expect(stderr).toEqual('');
    });

    it('should display version with "--version"', async () => {
      const { error, stdout, stderr } = await asyncExec(`${COMPILER} --version`);

      expect(error).toEqual(undefined);
      expect(stdout).toEqual(`${version}\n`);
      expect(stderr).toEqual('');
    });
  });

  describe('File Parsing', () => {
    it('should throw an error for using a wrong file type', async () => {
      try {
        await asyncExec(`${COMPILER} -o test.yaml ${TEST_DATA_DIR}/wrong-file.txt`);
      } catch (error) {
        const trueErrorMessage = error.stderr.split('\n').shift();

        expect(trueErrorMessage).toEqual('Error: No valid config found');
      }
    });

    it('should throw an error when giving an invalid path', async () => {
      const filePath = `${TEST_DATA_DIR}/wrong-path/wrong-file.yaml`;
      try {
        await asyncExec(`${COMPILER} -o test.yaml ${filePath}`);
      } catch (error) {
        const trueErrorMessage = error.stderr.split('\n').shift();

        expect(trueErrorMessage)
          .toEqual(`Error: Path does not exist: ${filePath}`);
      }
    });

    it('should parse a YAML template', async () => {
      const { stdout } = await asyncExec(`${COMPILER} -o test.yaml ${TEST_DATA_DIR}/file.yaml`);

      expect(stdout).toEqual(`Done. \nFile saved to ${process.cwd()}/test.yaml\n`);
      fs.unlinkSync(`${process.cwd()}/test.yaml`);
    });

    it('should parse a JSON template', async () => {
      const { stdout } = await asyncExec(`${COMPILER} -o test.yaml ${TEST_DATA_DIR}/file.json`);

      expect(stdout).toEqual(`Done. \nFile saved to ${process.cwd()}/test.yaml\n`);
      fs.unlinkSync(`${process.cwd()}/test.yaml`);
    });

    it('should parse a INI template', async () => {
      const { stdout } = await asyncExec(`${COMPILER} -o test.yaml ${TEST_DATA_DIR}/file.ini`);

      expect(stdout).toEqual(`Done. \nFile saved to ${process.cwd()}/test.yaml\n`);
      fs.unlinkSync(`${process.cwd()}/test.yaml`);
    });
  });
});
