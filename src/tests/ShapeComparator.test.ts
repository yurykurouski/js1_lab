import { ShapeComparators } from "../repositories/ShapeComparator";
import { MockShape, shapeAMock, shapeBMock } from "./mocks/mockShape";


describe('ShapeComparators', () => {
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