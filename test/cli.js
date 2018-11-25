const fs = require('fs');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const { expect } = require('code');
const { describe, it, beforeEach, afterEach, after } = exports.lab = require('lab').script();
const { version } = require('../package');

const COMPILER = './bin/compiler.js';

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

  describe('Options', () => {
    it('should display help with no arguments', async () => {
      const { error, stdout, stderr } = await exec(`${COMPILER}`);

      expect(error).to.be.equal(undefined);
      expect(stdout).to.be.equal(stdoutContent);
      expect(stderr).to.be.equal('');
    });

    it('should display help with "-h"', async () => {
      const { error, stdout, stderr } = await exec(`${COMPILER} -h`);

      expect(error).to.be.equal(undefined);
      expect(stdout).to.be.equal(stdoutContent);
      expect(stderr).to.be.equal('');
    });

    it('should display help with "--help"', async () => {
      const { error, stdout, stderr } = await exec(`${COMPILER} --help`);

      expect(error).to.be.equal(undefined);
      expect(stdout).to.be.equal(stdoutContent);
      expect(stderr).to.be.equal('');
    });

    it('should display version with "-V"', async () => {
      const { error, stdout, stderr } = await exec(`${COMPILER} -V`);

      expect(error).to.be.equal(undefined);
      expect(stdout).to.be.equal(`${version}\n`);
      expect(stderr).to.be.equal('');
    });

    it('should display version with "--version"', async () => {
      const { error, stdout, stderr } = await exec(`${COMPILER} --version`);

      expect(error).to.be.equal(undefined);
      expect(stdout).to.be.equal(`${version}\n`);
      expect(stderr).to.be.equal('');
    });
  });

  describe('File Parsing', () => {
    it('should throw an error for using a wrong file type', async () => {
      const fn = async () => {
        await exec(`${COMPILER} -o test.yaml ${__dirname}/data/wrong-file.txt`);
      };

      try {
        await new Promise((resolve) => {
          resolve(fn());
        });
      }
      catch (error) {
        const trueErrorMessage = error.stderr.split('\n').shift();

        expect(trueErrorMessage).to.be.equal('Error: No valid config found');
      }
    });

    it('should parse the template', async () => {
      after(() => {
        fs.unlinkSync(`${process.cwd()}/test.yaml`);
      });

      const { stdout } = await exec(`${COMPILER} -o test.yaml ${__dirname}/data/file.yaml`);

      expect(stdout).to.be.equal(`Done. \nFile saved to ${process.cwd()}/test.yaml\n`);
    });
  });
});
