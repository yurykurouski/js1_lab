import { Cube } from '../entities/Cube';
import { Oval } from '../entities/Oval';
import { Point } from '../entities/Point';
import { CubeValidator } from '../validators/CubeValidator';

import { OvalValidator } from '../validators/OvalValidator';
import { logger } from '../utils/logger';
import { InvalidShapeError } from '../exceptions/InvalidShapeError';
import { Shape } from '../entities/Shape';

export class ShapeFactory {
  static createCube(id: string, values: string[]): Cube | null {
    try {
      CubeValidator.validateInputValues(values);

      const [x, y, z, edgeLength] = values.map(Number);
      const point = new Point(x, y, z);

      return new Cube(id, point, edgeLength);
    } catch (e) {
      if (e instanceof InvalidShapeError) {
        logger.error(`Error creating cube: ${e.message}`);
      }

      return null;
    }
  }

  static createOval(id: string, values: string[]): Oval | null {
    try {
      OvalValidator.validateInputValues(values);

      const [x1, y1, x2, y2] = values.map(Number);
      const point1 = new Point(x1, y1);
      const point2 = new Point(x2, y2);

      return new Oval(id, point1, point2);
    } catch (e) {
      if (e instanceof InvalidShapeError) {
        logger.error(`Error creating oval: ${e.message}`);
      }
      return null;
    }
  }

  static createShapeFromLine(line: string, id: string): Shape | null {
    const parts = line.trim().split(/\s+/);
    const shapeType = parts[0].toUpperCase();
    const args = parts.slice(1);

    switch (shapeType) {
      case 'CUBE':
        return this.createCube(id, args);
      case 'OVAL':
        return this.createOval(id, args);
      default:
        logger.error(`Unknown shape type: ${shapeType}`);
        return null;
    }
  }
}
