import { Cube } from '../entities/Cube';
import { ShapeService } from './ShapeService';


export class CubeService implements ShapeService<Cube> {
  public calculateArea(cube: Cube): number | undefined {
    return 6 * Math.pow(cube.edgeLength, 2);
  }

  public calculatePerimeter(cube: Cube): number | undefined {
    return 12 * cube.edgeLength;
  }

  public calculateVolume(cube: Cube): number {
    return Math.pow(cube.edgeLength, 3);
  }

  public isCube(cube: Cube): boolean {
    return cube.edgeLength > 0;
  }

  public intersectsCoordinatePlane(cube: Cube): boolean {
    const { x, y, z } = cube.point;
    const edge = cube.edgeLength;

    return (
      (x <= 0 && x + edge >= 0) || (y <= 0 && y + edge >= 0) || (z <= 0 && z + edge >= 0)
    );
  }

  public baseLiesOnCoordinatePlane(cube: Cube): boolean {
    const { x, y, z } = cube.point;

    const onXY = z === 0;

    const onXZ = y === 0;

    const onYZ = x === 0;

    return onXY || onXZ || onYZ;
  }

  public getBaseCoordinatePlane(cube: Cube): string[] {
    const { x, y, z } = cube.point;
    const planes: string[] = [];

    if (z === 0) planes.push('XY');
    if (y === 0) planes.push('XZ');
    if (x === 0) planes.push('YZ');

    return planes.length > 0 ? planes : ['None'];
  }
}

export const cubeService = new CubeService();
