import { Point } from './Point';

export class Oval {
  public readonly id: string;
  public readonly point1: Point;
  public readonly point2: Point;

  constructor(id: string, point1: Point, point2: Point) {
    this.id = id;
    this.point1 = point1;
    this.point2 = point2;
  }
}
