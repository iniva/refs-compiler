"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var yamlProcessor = _interopRequireWildcard(require("./processors/yaml"));

var jsonProcessor = _interopRequireWildcard(require("./processors/json"));

var iniProcessor = _interopRequireWildcard(require("./processors/ini"));

var _objects = require("./utils/objects");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @class Processor
 */
class Processor {
  constructor() {
    this.processors = {
      yml: yamlProcessor,
      yaml: yamlProcessor,
      json: jsonProcessor,
      ini: iniProcessor
    };
  }
  /**
   * @function getProcessor
   * @description Returns a Processor for the [type] passed
   *
   * @param {String} type
   */


  getProcessor(type) {
    if (!(0, _objects.hasOwnProperty)(this.processors, type)) {
      throw new Error(`${type} processor is invalid`);
    }

    return this.processors[type];
  }

}

exports.default = Processor;