import { Cube } from '../entities/Cube';
import { Point } from '../entities/Point';
import { CubeService } from '../services/CubeService';

describe('GIVEN CubeService', () => {
  const cubeService = new CubeService();
  const cube = new Cube('cube1', new Point(0, 0, 0), 3);

  describe('WHEN calculating surface area', () => {
    it('THEN return correct result', () => {
      const result = cubeService.calculateArea(cube);
      expect(result).toBe(54);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('WHEN calculating volume', () => {
    it('THEN return correct result', () => {
      const result = cubeService.calculateVolume(cube);
      expect(result).toBe(27);
      expect(result).toEqual(3 ** 3);
    });
  });

  describe('WHEN checking isCube', () => {
    it('THEN return true', () => {
      expect(cubeService.isCube(cube)).toBe(true);
    });
  });

  describe('WHEN checking plane intersection', () => {
    it('THEN return true', () => {
      expect(cubeService.intersectsCoordinatePlane(cube)).toBe(true);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      expect(cubeService.baseLiesOnCoordinatePlane(cube)).toBe(true);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      expect(cubeService.baseLiesOnCoordinatePlane(cube)).toBe(true);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      expect(cubeService.getBaseCoordinatePlane(cube)).toEqual(['XY', 'XZ', 'YZ']);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      const cube = new Cube('cube2', new Point(1, 2, 0), 3);
      expect(cubeService.getBaseCoordinatePlane(cube)).toEqual(['XY']);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      const cube = new Cube('cube3', new Point(4, 0, 5), 3);
      expect(cubeService.getBaseCoordinatePlane(cube)).toEqual(['XZ']);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      const cube = new Cube('cube4', new Point(0, 3, 7), 3);
      expect(cubeService.getBaseCoordinatePlane(cube)).toEqual(['YZ']);
    });
  });

  describe('WHEN checking base on plane', () => {
    it('THEN return true', () => {
      const cube = new Cube('cube5', new Point(1, 2, 3), 3);
      expect(cubeService.getBaseCoordinatePlane(cube)).toEqual(['None']);
    });
  });
});
