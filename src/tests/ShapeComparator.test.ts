import { ShapeType } from "../entities/constants";
import { ShapeComparators } from "../repositories/ShapeComparator";
import { MockShape } from "./mocks/mockShape";


describe('ShapeComparators', () => {
    const shapeAMock = new MockShape('id2', { x: 1, y: 2, z: 0 }, ShapeType.OVAL);
    const shapeBMock = new MockShape('id1', { x: 3, y: 4, z: 5 }, ShapeType.CUBE);

    it('should sort shapes by id lexicographically', () => {
        const arr = [shapeAMock, shapeBMock];

        arr.sort(ShapeComparators.byId<MockShape>());

        expect(arr).toEqual([shapeBMock, shapeAMock]);
    });

    it('should sort shapes by name', () => {
        const arr = [shapeAMock, shapeBMock];

        arr.sort(ShapeComparators.byType<MockShape>());

        expect(arr).toEqual([shapeBMock, shapeAMock]);
    });

    it('should sort shapes by point.x', () => {
        const arr = [shapeBMock, shapeAMock];

        arr.sort(ShapeComparators.byFirstPointX<MockShape>());

        expect(arr).toEqual([shapeAMock, shapeBMock]);
    });

    it('should sort shapes by point.y', () => {
        const arr = [shapeBMock, shapeAMock];

        arr.sort(ShapeComparators.byFirstPointY<MockShape>());

        expect(arr).toEqual([shapeAMock, shapeBMock]);
    });
});