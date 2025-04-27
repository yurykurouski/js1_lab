import { Point } from './Point';

export class Cube {
  public readonly id: string;
  public readonly point: Point;
  public readonly edgeLength: number;

  constructor(id: string, point: Point, edgeLength: number) {
    this.id = id;
    this.point = point;
    this.edgeLength = edgeLength;
  }
}
