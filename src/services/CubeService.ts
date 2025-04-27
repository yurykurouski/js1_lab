import { Cube } from '../entities/Cube';

export class CubeService {
  static calculateSurfaceArea(cube: Cube): number {
    return 6 * Math.pow(cube.edgeLength, 2);
  }

  static calculateVolume(cube: Cube): number {
    return Math.pow(cube.edgeLength, 3);
  }

  static isCube(cube: Cube): boolean {
    return cube.edgeLength > 0;
  }

  static intersectsCoordinatePlane(cube: Cube): boolean {
    const { x, y, z } = cube.point;
    const edge = cube.edgeLength;

    return (
      (x <= 0 && x + edge >= 0) || (y <= 0 && y + edge >= 0) || (z <= 0 && z + edge >= 0)
    );
  }

  static baseLiesOnCoordinatePlane(cube: Cube): boolean {
    const { x, y, z } = cube.point;

    const onXY = z === 0;

    const onXZ = y === 0;

    const onYZ = x === 0;

    return onXY || onXZ || onYZ;
  }

  static getBaseCoordinatePlane(cube: Cube): string[] {
    const { x, y, z } = cube.point;
    const planes: string[] = [];

    if (z === 0) planes.push('XY');
    if (y === 0) planes.push('XZ');
    if (x === 0) planes.push('YZ');

    return planes.length > 0 ? planes : ['None'];
  }
}
