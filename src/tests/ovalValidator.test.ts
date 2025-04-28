import { OvalValidator } from '../validators/OvalValidator';
import { InvalidShapeError } from '../exceptions/InvalidShapeError';

describe('GIVEN OvalValidator', () => {
  describe('WHEN validating input values', () => {
    it('THEN return true', () => {
      const values = ['0', '0', '2', '3'];

      expect(() => OvalValidator.validateInputValues(values)).not.toThrow();
    });
  });

  describe('WHEN validating input values', () => {
    it('THEN return true', () => {
      const values = ['1', '2', '1', '5'];

      expect(() => OvalValidator.validateInputValues(values)).toThrow(InvalidShapeError);
    });
  });

  describe('WHEN validating input values', () => {
    it('THEN return true', () => {
      const values = ['1', 'a', '3', '4'];

      expect(() => OvalValidator.validateInputValues(values)).toThrow(InvalidShapeError);
    });
  });

  describe('WHEN validating input values', () => {
    it('THEN return true', () => {
      const values = ['1', '2', '3'];

      expect(() => OvalValidator.validateInputValues(values)).toThrow(InvalidShapeError);
    });
  });
});
