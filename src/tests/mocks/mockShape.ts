import { ShapeType } from "../../entities/constants";
import { Point } from "../../entities/Point";
import { Shape } from "../../entities/Shape";

export class MockShape extends Shape {
    constructor(public id: string, public firstPoint: Point, type: ShapeType) {
        super(id, firstPoint, type);
    }
}

export const shapeAMock = new MockShape('id2', { x: 1, y: 2, z: 0 }, ShapeType.OVAL);
export const shapeBMock = new MockShape('id1', { x: 3, y: 4, z: 5 }, ShapeType.CUBE);