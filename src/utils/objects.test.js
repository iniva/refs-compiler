/* global describe it expect */

import { hasOwnProperty, clean } from './objects';

describe('Object Helpers:', () => {
  describe('hasOwnProperty:', () => {
    it('should return false when the property does not exists', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
      };

      expect(hasOwnProperty(object, 'age')).toBeFalsy();
    });

    it('should return true when the property exists', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
      };

      expect(hasOwnProperty(object, 'lastName')).toBeTruthy();
    });
  });

  describe('clean', () => {
    it('should return given object without invalid values', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
        age: null,
        address: undefined,
        test: false,
      };
      const newObj = clean(object);

      expect(newObj).not.toHaveProperty('age');
      expect(newObj).not.toHaveProperty('address');
      expect(newObj).not.toHaveProperty('test');
    });

    it('should return given object without invalid values according to the "allowed" options', () => {
      const object = {
        name: 'Testy',
        lastName: 'McTesty',
        age: null,
        address: undefined,
        test: false,
      };
      const options = { _false: true };
      const newObj = clean(object, options);

      expect(newObj).not.toHaveProperty('age');
      expect(newObj).not.toHaveProperty('address');
      expect(newObj).toHaveProperty('test');
    });
  });
});
