const fs = require('fs');
const { expect } = require('code');
const { describe, it, after } = exports.lab = require('lab').script();

const Processor = require('../lib/processor');
const yaml = require('../lib/processors/yaml');
// const json = require('../lib/processors/json');
// const ini = require('../lib/processors/ini');

describe('Processors Tests', () => {
  describe('Processor Class', () => {
    it('should throw error when getProcessor receives a wrong type', () => {
      const fn = () => {
        Processor.getProcessor('wrong');
      };

      try {
        fn();
      }
      catch (error) {
        expect(error.message).to.be.equal('wrong processor is invalid');
      }
    });

    it('should return a valid processor when getProcessor receives a valid type', () => {
      const yamlProcessor = Processor.getProcessor('yaml');
      const ymlProcessor = Processor.getProcessor('yml');
      const jsonProcessor = Processor.getProcessor('json');
      const iniProcessor = Processor.getProcessor('ini');

      expect(yamlProcessor).to.be.an.object();
      expect(ymlProcessor).to.be.an.object();
      expect(jsonProcessor).to.be.an.object();
      expect(iniProcessor).to.be.an.object();
      expect(Object.keys(yamlProcessor)).to.include(['process', 'dump', 'write']);
      expect(Object.keys(ymlProcessor)).to.include(['process', 'dump', 'write']);
      expect(Object.keys(jsonProcessor)).to.include(['process', 'dump', 'write']);
      expect(Object.keys(iniProcessor)).to.include(['process', 'dump', 'write']);
    });
  });
});
