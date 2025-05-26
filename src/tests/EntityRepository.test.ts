import { ShapeMapper } from '../services/ShapeMapper';
import { logger } from '../utils/logger';
import { EntityRepository } from '../repositories/EntityRepository';
import { warehouse } from '../repositories/Warehouse';
import { ShapeComparators } from '../repositories/ShapeComparator';
import { ShapeType } from '../entities/constants';
import { MockShape, shapeAMock, shapeBMock } from './mocks/mockShape';


jest.mock('../services/ShapeMapper');
jest.mock('../utils/logger');
jest.mock('../repositories/Warehouse', () => ({
    warehouse: {
        setArea: jest.fn(),
        setPerimeter: jest.fn(),
        setVolume: jest.fn(),
        getArea: jest.fn(),
        getPerimeter: jest.fn(),
        remove: jest.fn(),
    }
}));
jest.mock('../repositories/ShapeComparator', () => ({
    ShapeComparators: {
        byId: jest.fn(),
        byFirstPointX: jest.fn(),
        byFirstPointY: jest.fn(),
        byType: jest.fn(),
    }
}));


describe('EntityRepository', () => {
    let repo: EntityRepository<MockShape>;

    beforeEach(() => {
        repo = new EntityRepository<MockShape>();

        jest.clearAllMocks();

        (ShapeMapper as jest.Mock).mockImplementation((entity, method) => {
            if (method === 'calculateArea') return 10;
            if (method === 'calculatePerimeter') return 20;
            if (method === 'calculateVolume') return 30;
        });
    });

    it('should initialize with empty entities', () => {
        expect(repo.getAll()).toEqual([]);
    });

    it('should add an entity and update warehouse', () => {
        expect(repo.add(shapeAMock)).toBe(true);
        expect(repo.findById('id2')).toBe(shapeAMock);
        expect(warehouse.setArea).toHaveBeenCalledWith('id2', 10);
        expect(warehouse.setPerimeter).toHaveBeenCalledWith('id2', 20);
        expect(warehouse.setVolume).toHaveBeenCalledWith('id2', 30);
    });

    it('should find entity by id', () => {
        repo.add(shapeAMock);

        expect(repo.findById('id2')).toBe(shapeAMock);
        expect(repo.findById('notfound')).toBeUndefined();
    });

    it('should find entity by name', () => {
        repo.add(shapeAMock);

        expect(repo.findByName('MockShape')).toBe(shapeAMock);
        expect(repo.findByName('OtherShape')).toBeUndefined();
    });

    it('should return all entities', () => {
        repo.add(shapeAMock);
        repo.add(shapeBMock);

        expect(repo.getAll()).toEqual([shapeAMock, shapeBMock]);
    });

    it('should remove entity and call warehouse.remove', () => {
        repo.add(shapeAMock);

        expect(repo.remove('id2')).toBe(true);
        expect(repo.findById('id2')).toBeUndefined();
        expect(warehouse.remove).toHaveBeenCalledWith('id2');
    });

    it('should return false when removing non-existent entity', () => {
        expect(repo.remove('notfound')).toBe(false);
    });

    it('should update existing entity and warehouse', () => {
        repo.add(shapeAMock);

        const updated = new MockShape('id2', { x: 9, y: 9, z: 0 }, ShapeType.CUBE);

        expect(repo.update(updated)).toBe(true);
        expect(repo.findById('id2')).toBe(updated);
        expect(warehouse.setArea).toHaveBeenCalledWith('id2', 10);
    });

    it('should return false when updating non-existent entity', () => {
        expect(repo.update(shapeAMock)).toBe(false);
    });

    it('should find shapes in area range', () => {
        (warehouse.getArea as jest.Mock).mockImplementation((id) => id === 'id2' ? 15 : 5);

        repo.add(shapeAMock);
        repo.add(shapeBMock);

        expect(repo.findShapesInArea(10, 20)).toEqual([shapeAMock]);
        expect(repo.findShapesInArea(0, 10)).toEqual([shapeBMock]);
    });

    it('should find shapes in perimeter range', () => {
        (warehouse.getPerimeter as jest.Mock).mockImplementation((id) => id === 'id2' ? 25 : 8);

        repo.add(shapeAMock);
        repo.add(shapeBMock);

        expect(repo.findShapesInPerimeter(20, 30)).toEqual([shapeAMock]);
        expect(repo.findShapesInPerimeter(0, 10)).toEqual([shapeBMock]);
    });

    it('should sort entities using custom comparator', () => {
        repo.add(shapeBMock);
        repo.add(shapeAMock);

        const comparator = (a: MockShape, b: MockShape) => a.id.localeCompare(b.id);

        expect(repo.sort(comparator)).toEqual([shapeBMock, shapeAMock]);
    });

    it('should sort by id', () => {
        (ShapeComparators.byId as jest.Mock).mockImplementation(() => (a: MockShape, b: MockShape) => a.id.localeCompare(b.id));

        repo.add(shapeBMock);
        repo.add(shapeAMock);

        expect(repo.sortById()).toEqual([shapeBMock, shapeAMock]);
        expect(ShapeComparators.byId).toHaveBeenCalled();
    });

    it('should sort by name', () => {
        (ShapeComparators.byType as jest.Mock).mockImplementation(() =>
            (a: MockShape, b: MockShape) => a.type.localeCompare(b.type));

        repo.add(shapeAMock);
        repo.add(shapeBMock);

        expect(repo.sortByName()).toEqual([shapeBMock, shapeAMock]);
        expect(ShapeComparators.byType).toHaveBeenCalled();
    });

    it('should sort by firstPoint.x', () => {
        (ShapeComparators.byFirstPointX as jest.Mock).mockImplementation(() =>
            (a: MockShape, b: MockShape) => a.firstPoint.x - b.firstPoint.x);

        repo.add(shapeBMock);
        repo.add(shapeAMock);

        expect(repo.sortByFirstPointX()).toEqual([shapeAMock, shapeBMock]);
        expect(ShapeComparators.byFirstPointX).toHaveBeenCalled();
    });

    it('should sort by firstPoint.y', () => {
        (ShapeComparators.byFirstPointY as jest.Mock).mockImplementation(() =>
            (a: MockShape, b: MockShape) => a.firstPoint.y - b.firstPoint.y);

        repo.add(shapeBMock);
        repo.add(shapeAMock);

        expect(repo.sortByFirstPointY()).toEqual([shapeAMock, shapeBMock]);
        expect(ShapeComparators.byFirstPointY).toHaveBeenCalled();
    });

    it('should log error if unknown error is thrown in updateWarehouse', () => {
        (ShapeMapper as jest.Mock).mockImplementation(() => { throw new Error('unknown'); });

        repo.add(shapeAMock);

        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Unexpected error updating warehouse for entity id2'));
    });
});