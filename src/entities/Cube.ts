import { ShapeType } from './constants';
import { Point } from './Point';
import { Shape } from './Shape';

export class Cube extends Shape {
  public readonly edgeLength: number;

  constructor(id: string, point: Point, edgeLength: number) {
    super(id, point, ShapeType.CUBE);

    this.edgeLength = edgeLength;
  }
}
