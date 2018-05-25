const fs = require('fs');
const { expect } = require('code');
const { describe, it, after } = exports.lab = require('lab').script();

const compiler = require('../');

describe('Compiler Tests', () => {
  const files = {
    YAML: `${__dirname}/parsed.yaml`,
    JSON: `${__dirname}/parsed.json`,
    INI: `${__dirname}/parsed.ini`
  };

  it('should throw error and exit with no input file arguments', async () => {
    const fn = async () => {
      await compiler();
    };

    try {
      await fn();
    }
    catch (error) {
      expect(error.message).to.be.equal('No template file provided');
    }
  });

  it('should throw error and exit with non-existent file path', async () => {
    const fn = async () => {
      await compiler(`${__dirname}/does-not-exist.yaml`);
    };

    try {
      await fn();
    }
    catch (error) {
      expect(error.message).to.be.equal(`Path does not exist: ${__dirname}/does-not-exist.yaml`);
    }
  });

  it('should throw error and exit with non-existent file path', async () => {
    const fn = async () => {
      await compiler(`${__dirname}/does-not-exist`);
    };

    try {
      await fn();
    }
    catch (error) {
      expect(error.message).to.be.equal('No valid config found');
    }
  });

  describe('with files', () => {
    after(() => {
      try {
        fs.unlinkSync(files.JSON);
        fs.unlinkSync(files.YAML);
        fs.unlinkSync(files.INI);
      }
      catch (error) {
        console.log(error);
      }
    });

    describe('JSON', () => {
      it('should throw error when processor.process throws an error with JSON file', async () => {
        fs.writeFileSync(files.JSON, 'malformed json', 'utf-8');

        const fn = async () => {
          await compiler(files.JSON);
        };

        try {
          await fn();
        }
        catch (error) {
          expect(error).to.be.instanceof(Error);
        }
      });

      it('should parse correctly a JSON template', async () => {
        compiler(`${__dirname}/data/file.json`, files.JSON)
          .then((results) => {
            expect(results.outputFile).to.be.equal(files.JSON);
          });
      });
    });

    describe('YAML', () => {
      it('should throw error when processor.process throws an error with YAML file', async () => {
        fs.writeFileSync(files.YAML, 'malformed yaml', 'utf-8');

        const fn = async () => {
          await compiler(files.YAML);
        };

        try {
          await fn();
        }
        catch (error) {
          expect(error).to.be.instanceof(Error);
        }
      });

      it('should parse correctly a YAML template', async () => {
        compiler(`${__dirname}/data/file.yaml`, files.YAML)
          .then((results) => {
            expect(results.outputFile).to.be.equal(files.YAML);
          });
      });
    });

    describe('INI', () => {
      it('should throw error when processor.process throws an error with INI file', async () => {
        fs.writeFileSync(files.INI, 'malformed ini', 'utf-8');

        const fn = async () => {
          await compiler(files.INI);
        };

        try {
          await fn();
        }
        catch (error) {
          expect(error).to.be.instanceof(Error);
        }
      });

      it('should parse correctly an INI template', async () => {
        compiler(`${__dirname}/data/file.ini`, files.INI)
          .then((results) => {
            expect(results.outputFile).to.be.equal(files.INI);
          });
      });
    });
  });
});