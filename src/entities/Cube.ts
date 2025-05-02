import { Point } from './Point';
import { Shape } from './Shape';

export class Cube extends Shape {
  public readonly point: Point;
  public readonly edgeLength: number;

  constructor(id: string, point: Point, edgeLength: number) {
    super(id);

    this.point = point;
    this.edgeLength = edgeLength;
  }
}
