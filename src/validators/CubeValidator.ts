import { Point } from '../entities/Point';
import { InvalidShapeError } from '../exceptions/InvalidShapeError';

export class CubeValidator {
  static isValidPoint(point: Point): boolean {
    return !isNaN(point.x) && !isNaN(point.y) && !isNaN(point.z);
  }

  static isValidEdgeLength(edgeLength: number): boolean {
    return edgeLength > 0;
  }

  static validateInputValues(values: string[]): void {
    if (values.length < 4) {
      throw new InvalidShapeError('Not enough arguments to create a cube');
    }

    const [xStr, yStr, zStr, edgeStr] = values;

    const x = Number(xStr);
    const y = Number(yStr);
    const z = Number(zStr);
    const edgeLength = Number(edgeStr);

    if ([x, y, z, edgeLength].some((v) => isNaN(v))) {
      throw new InvalidShapeError('One or more values are not numbers');
    }

    if (!this.isValidEdgeLength(edgeLength)) {
      throw new InvalidShapeError('The edge of the cube must be a positive number');
    }
  }
}
