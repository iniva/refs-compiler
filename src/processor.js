/*
* Processor Class
*
* Available processors:
*   - Yml
*   - Yaml
*   - Json
*   - Ini
*/

const yaml = require('./processors/yaml');
const json = require('./processors/json');
const ini = require('./processors/ini');

const processors = {
  yml: yaml,
  yaml,
  json,
  ini,
};

class Processor {
  static getProcessor(type) {
    if (!processors.hasOwnProperty(type)) {
      throw new Error(`${type} processor is invalid`);
    }
    return processors[type];
  }
}

module.exports = Processor;
