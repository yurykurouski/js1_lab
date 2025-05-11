import { ShapeMapper } from '../services/ShapeMapper';
import { logger } from '../utils/logger';
import { EntityRepository } from '../repositories/EntityRepository';
import { warehouse } from '../repositories/Warehouse';
import { ShapeComparators } from '../repositories/ShapeComparator';
import { ShapeType } from '../entities/constants';
import { MockShape } from './mocks/mockShape';


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
        byName: jest.fn(),
        byFirstPointX: jest.fn(),
        byFirstPointY: jest.fn(),
    }
}));


describe('EntityRepository', () => {
    let repo: EntityRepository<MockShape>;
    let shape1: MockShape;
    let shape2: MockShape;

    beforeEach(() => {
        repo = new EntityRepository<MockShape>();
        shape1 = new MockShape('id1', { x: 1, y: 2, z: 0 }, ShapeType.OVAL);
        shape2 = new MockShape('id2', { x: 3, y: 4, z: 5 }, ShapeType.CUBE);

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
        expect(repo.add(shape1)).toBe(true);
        expect(repo.findById('id1')).toBe(shape1);
        expect(warehouse.setArea).toHaveBeenCalledWith('id1', 10);
        expect(warehouse.setPerimeter).toHaveBeenCalledWith('id1', 20);
        expect(warehouse.setVolume).toHaveBeenCalledWith('id1', 30);
    });

    it('should find entity by id', () => {
        repo.add(shape1);

        expect(repo.findById('id1')).toBe(shape1);
        expect(repo.findById('notfound')).toBeUndefined();
    });

    it('should find entity by name', () => {
        repo.add(shape1);

        expect(repo.findByName('MockShape')).toBe(shape1);
        expect(repo.findByName('OtherShape')).toBeUndefined();
    });

    it('should return all entities', () => {
        repo.add(shape1);
        repo.add(shape2);

        expect(repo.getAll()).toEqual([shape1, shape2]);
    });

    it('should remove entity and call warehouse.remove', () => {
        repo.add(shape1);

        expect(repo.remove('id1')).toBe(true);
        expect(repo.findById('id1')).toBeUndefined();
        expect(warehouse.remove).toHaveBeenCalledWith('id1');
    });

    it('should return false when removing non-existent entity', () => {
        expect(repo.remove('notfound')).toBe(false);
    });

    it('should update existing entity and warehouse', () => {
        repo.add(shape1);

        const updated = new MockShape('id1', { x: 9, y: 9, z: 0 }, ShapeType.CUBE);

        expect(repo.update(updated)).toBe(true);
        expect(repo.findById('id1')).toBe(updated);
        expect(warehouse.setArea).toHaveBeenCalledWith('id1', 10);
    });

    it('should return false when updating non-existent entity', () => {
        expect(repo.update(shape1)).toBe(false);
    });

    it('should find shapes in area range', () => {
        (warehouse.getArea as jest.Mock).mockImplementation((id) => id === 'id1' ? 15 : 5);

        repo.add(shape1);
        repo.add(shape2);

        expect(repo.findShapesInArea(10, 20)).toEqual([shape1]);
        expect(repo.findShapesInArea(0, 10)).toEqual([shape2]);
    });

    it('should find shapes in perimeter range', () => {
        (warehouse.getPerimeter as jest.Mock).mockImplementation((id) => id === 'id1' ? 25 : 8);

        repo.add(shape1);
        repo.add(shape2);

        expect(repo.findShapesInPerimeter(20, 30)).toEqual([shape1]);
        expect(repo.findShapesInPerimeter(0, 10)).toEqual([shape2]);
    });

    it('should sort entities using custom comparator', () => {
        repo.add(shape2);
        repo.add(shape1);

        const comparator = (a: MockShape, b: MockShape) => a.id.localeCompare(b.id);

        expect(repo.sort(comparator)).toEqual([shape1, shape2]);
    });

    it('should sort by id', () => {
        (ShapeComparators.byId as jest.Mock).mockImplementation(() => (a: MockShape, b: MockShape) => a.id.localeCompare(b.id));

        repo.add(shape2);
        repo.add(shape1);

        expect(repo.sortById()).toEqual([shape1, shape2]);
        expect(ShapeComparators.byId).toHaveBeenCalled();
    });

    it('should sort by name', () => {
        (ShapeComparators.byName as jest.Mock).mockImplementation(() =>
            (a: MockShape, b: MockShape) => a.constructor.name.localeCompare(b.constructor.name));

        repo.add(shape1);
        repo.add(shape2);

        expect(repo.sortByName()).toEqual([shape1, shape2]);
        expect(ShapeComparators.byName).toHaveBeenCalled();
    });

    it('should sort by firstPoint.x', () => {
        (ShapeComparators.byFirstPointX as jest.Mock).mockImplementation(() =>
            (a: MockShape, b: MockShape) => a.firstPoint.x - b.firstPoint.x);

        repo.add(shape2);
        repo.add(shape1);

        expect(repo.sortByFirstPointX()).toEqual([shape1, shape2]);
        expect(ShapeComparators.byFirstPointX).toHaveBeenCalled();
    });

    it('should sort by firstPoint.y', () => {
        (ShapeComparators.byFirstPointY as jest.Mock).mockImplementation(() =>
            (a: MockShape, b: MockShape) => a.firstPoint.y - b.firstPoint.y);

        repo.add(shape2);
        repo.add(shape1);

        expect(repo.sortByFirstPointY()).toEqual([shape1, shape2]);
        expect(ShapeComparators.byFirstPointY).toHaveBeenCalled();
    });

    it('should log error if unknown error is thrown in updateWarehouse', () => {
        (ShapeMapper as jest.Mock).mockImplementation(() => { throw new Error('unknown'); });

        repo.add(shape1);

        expect(logger.error).toHaveBeenCalledWith(expect.stringContaining('Unexpected error updating warehouse for entity id1'));
    });
});