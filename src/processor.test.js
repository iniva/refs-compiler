/* global describe it expect */

import Processor from './processor';

describe('Processor', () => {
  it('should throw when trying to get a processor without specifying the type', () => {
    const processor = new Processor();

    expect(() => processor.getProcessor())
      .toThrowError('You must specify a processor type');
    expect(() => processor.getProcessor(null))
      .toThrowError('You must specify a processor type');
  });

  it('should throw when trying to get an invalid processor', () => {
    const processor = new Processor();

    expect(() => processor.getProcessor('wrong'))
      .toThrow('Processor [wrong] is invalid');
  });

  it('should return a processor when given a valid type', () => {
    const processor = new Processor();
    const expectedProperties = ['handler', 'dump', 'write'];

    const yamlProcessor = processor.getProcessor('yaml');
    const ymlProcessor = processor.getProcessor('yml');
    const jsonProcessor = processor.getProcessor('json');
    const iniProcessor = processor.getProcessor('ini');

    expect(typeof yamlProcessor).toBe('object');
    expect(Object.keys(yamlProcessor))
      .toEqual(expect.arrayContaining(expectedProperties));

    expect(typeof ymlProcessor).toBe('object');
    expect(Object.keys(ymlProcessor))
      .toEqual(expect.arrayContaining(expectedProperties));

    expect(typeof jsonProcessor).toBe('object');
    expect(Object.keys(jsonProcessor))
      .toEqual(expect.arrayContaining(expectedProperties));

    expect(typeof iniProcessor).toBe('object');
    expect(Object.keys(iniProcessor))
      .toEqual(expect.arrayContaining(expectedProperties));
  });
});
