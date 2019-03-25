/* global describe it expect */
import { write, dump } from './json';

// Example taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
const circularReference = {};
circularReference.myself = circularReference;

describe('JSON Processor functions:', () => {
  describe('write', () => {
    it('should throw when receiving an invalid path for the output file', async () => {
      await expect(write())
        .rejects
        .toThrow();
    });

    it('should throw when JSON.stringify throws', async () => {
      await expect(write(`${__dirname}/parsed.json`, circularReference))
        .rejects
        .toThrow();
    });
  });

  describe('dump', () => {
    it('should throw when JSON.stringify throws', () => {
      expect(() => dump(circularReference))
        .toThrow();
    });
  });
});
