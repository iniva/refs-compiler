import * as yamlProcessor from './processors/yaml';
import * as jsonProcessor from './processors/json';
import * as iniProcessor from './processors/ini';
import { hasOwnProperty } from './utils/objects';

/**
 * @class Processor
 */
export default class Processor {
  constructor() {
    this.processors = {
      yml: yamlProcessor,
      yaml: yamlProcessor,
      json: jsonProcessor,
      ini: iniProcessor,
    };
  }

  /**
   * @function getProcessor
   * @description Returns a Processor for the [type] passed
   *
   * @param {String} type
   */
  getProcessor(type) {
    if (!hasOwnProperty(this.processors, type)) {
      throw new Error(`${type} processor is invalid`);
    }
    return this.processors[type];
  }
}
