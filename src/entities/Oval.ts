import { ShapeType } from './constants';
import { Point } from './Point';
import { Shape } from './Shape';

export class Oval extends Shape {
  public readonly point1: Point;

  constructor(id: string, point: Point, point1: Point) {
    super(id, point, ShapeType.OVAL);

    this.point1 = point1;
  }
}
