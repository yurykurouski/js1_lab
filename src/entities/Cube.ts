import { ShapeType } from './constants';
import { Point } from './Point';
import { Shape } from './Shape';
import { warehouse } from "../repositories/Warehouse";

export class Cube extends Shape {
  private _edgeLength: number;

  constructor(id: string, point: Point, edgeLength: number) {
    super(id, point, ShapeType.CUBE);

    this._edgeLength = edgeLength;
    this.addObserver(warehouse);
  }

  get edgeLength(): number {
    return this._edgeLength;
  }

  set edgeLength(length: number) {
    this._edgeLength = length;
    this.notifyObservers();
  }
}
