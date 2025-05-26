import { Oval } from '../entities/Oval';
import { Point } from '../entities/Point';
import { OvalService } from '../services/OvalService';

describe('GIVEN OvalService', () => {
  const ovalService = new OvalService();
  const oval = new Oval('oval-1', new Point(-2, 1), new Point(2, 3));

  describe('WHEN calculating axes', () => {
    it('THEN return correct a and b', () => {
      const { a, b } = ovalService.getAxes(oval);
      expect(a).toBe(2);
      expect(b).toBe(1);
    });
  });

  describe('WHEN calculating area', () => {
    it('THEN return πab', () => {
      const area = ovalService.calculateArea(oval);
      expect(area).toBeCloseTo(Math.PI * 2 * 1);
      expect(area).toBeGreaterThan(0);
    });
  });

  describe('WHEN calculating perimeter', () => {
    it('THEN return approximated value', () => {
      const perimeter = ovalService.calculatePerimeter(oval);
      const expected = Math.PI * (3 * (2 + 1) - Math.sqrt((3 * 2 + 1) * (2 + 3 * 1)));
      expect(perimeter).toBeCloseTo(expected);
      expect(perimeter).toBeGreaterThan(0);
    });
  });

  describe('WHEN checking circle-shaped oval if is circle', () => {
    it('THEN return true', () => {
      const circle = new Oval('circle', new Point(0, 0), new Point(2, 2));
      expect(ovalService.isCircle(circle)).toBe(true);
    });
  });

  describe('WHEN checking isValidOval', () => {
    it('THEN return true', () => {
      expect(ovalService.isValidOval(oval)).toBe(true);
    });
  });

  describe('WHEN checking isValidOval', () => {
    it('THEN return false', () => {
      const line = new Oval('bad', new Point(1, 1), new Point(5, 1));
      expect(ovalService.isValidOval(line)).toBe(false);
    });
  });

  describe('WHEN checking isValidOval', () => {
    it('THEN return true', () => {
      const oneAxisOval = new Oval('one-axis', new Point(-4, 1), new Point(4, 3));
      expect(ovalService.intersectsExactlyOneAxis(oneAxisOval)).toBe(true);
    });
  });

  describe('WHEN checking isValidOval', () => {
    it('THEN return false', () => {
      const twoAxisOval = new Oval('both-axes', new Point(-2, -2), new Point(2, 2));
      expect(ovalService.intersectsExactlyOneAxis(twoAxisOval)).toBe(false);
    });
  });

  describe('WHEN checking isValidOval', () => {
    it('THEN return false', () => {
      const noAxisOval = new Oval('no-axis', new Point(1, 1), new Point(3, 3));
      expect(ovalService.intersectsExactlyOneAxis(noAxisOval)).toBe(false);
    });
  });
});
