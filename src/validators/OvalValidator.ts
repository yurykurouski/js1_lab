import { InvalidShapeError } from '../exceptions/InvalidShapeError';

export class OvalValidator {
  static validateInputValues(values: string[]): void {
    if (values.length < 4) {
      throw new InvalidShapeError('Not enough data to create an oval');
    }

    const [x1Str, y1Str, x2Str, y2Str] = values;
    const [x1, y1, x2, y2] = [x1Str, y1Str, x2Str, y2Str].map(Number);

    if ([x1, y1, x2, y2].some((v) => isNaN(v))) {
      throw new InvalidShapeError('Oval coordinates must be numbers');
    }

    if (x1 === x2 || y1 === y2) {
      throw new InvalidShapeError(
        'Oval points must not lie on the same vertical or horizontal line',
      );
    }
  }
}
