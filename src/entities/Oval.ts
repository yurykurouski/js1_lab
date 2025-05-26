import { ShapeType } from './constants';
import { Point } from './Point';
import { Shape } from './Shape';
import { warehouse } from '../repositories/Warehouse';

export class Oval extends Shape {
  private _point1: Point;

  constructor(id: string, point: Point, point1: Point) {
    super(id, point, ShapeType.OVAL);

    this._point1 = point1;
    this.addObserver(warehouse);
  }

  get point1(): Point {
    return this._point1;
  }

  set point1(p: Point) {
    this._point1 = p;
    this.notifyObservers();
  }
}
