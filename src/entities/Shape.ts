import { ShapeType } from "./constants";
import { Point } from "./Point";
import { IShapeObserver, IShapeSubject } from "./Observer";


export class Shape implements IShapeSubject {
  private readonly _id: string;
  private readonly _point: Point;
  public readonly type: ShapeType;

  private observers: IShapeObserver[] = [];

  constructor(id: string, point: Point, type: ShapeType) {
    this._id = id;
    this.type = type;
    this._point = point;
  }

  get id(): string {
    return this._id;
  }

  get point(): Point {
    return this._point;
  }

  addObserver(observer: IShapeObserver): void {
    this.observers.push(observer);
  }

  removeObserver(observer: IShapeObserver): void {
    this.observers = this.observers.filter(o => o !== observer);
  }

  notifyObservers(): void {
    for (const observer of this.observers) {
      observer.update(this.id);
    }
  }
}
