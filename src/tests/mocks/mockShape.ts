import { ShapeType } from "../../entities/constants";
import { Point } from "../../entities/Point";
import { Shape } from "../../entities/Shape";

export class MockShape extends Shape {
    constructor(public id: string, public firstPoint: Point, type: ShapeType) {
        super(id, firstPoint, type);
    }
}