import { ShapeType } from "./constants";
import { Point } from "./Point";

export class Shape {
  public readonly id: string;
  public readonly point: Point;
  public readonly type: ShapeType;

  constructor(id: string, point: Point, type: ShapeType) {
    this.id = id;
    this.type = type;
    this.point = point;
  }
}
