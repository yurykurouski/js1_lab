import { warehouse, Warehouse } from "../repositories/Warehouse";


describe('Warehouse', () => {
    let instance: Warehouse;

    beforeEach(() => {
        instance = Warehouse.getInstance();
    });

    it('should return the same instance (singleton)', () => {
        const another = Warehouse.getInstance();

        expect(instance).toBe(another);
    });

    it('should set and get area for a new id', () => {
        instance.setArea('shape1', 42);

        expect(instance.getArea('shape1')).toBe(42);
    });

    it('should set and get perimeter for a new id', () => {
        instance.setPerimeter('shape2', 15);

        expect(instance.getPerimeter('shape2')).toBe(15);
    });

    it('should set and get volume for a new id', () => {
        instance.setVolume('shape3', 100);

        expect(instance.getVolume('shape3')).toBe(100);
    });

    it('should update area, perimeter, and volume for the same id', () => {
        instance.setArea('shape4', 10);
        instance.setPerimeter('shape4', 20);
        instance.setVolume('shape4', 30);

        expect(instance.getArea('shape4')).toBe(10);
        expect(instance.getPerimeter('shape4')).toBe(20);
        expect(instance.getVolume('shape4')).toBe(30);

        instance.setArea('shape4', 99);

        expect(instance.getArea('shape4')).toBe(99);
    });

    it('should return undefined for unknown id', () => {
        expect(instance.getArea('unknown')).toBeUndefined();
        expect(instance.getPerimeter('unknown')).toBeUndefined();
        expect(instance.getVolume('unknown')).toBeUndefined();
    });

    it('should remove an id and its metrics', () => {
        instance.setArea('shape5', 5);
        instance.setPerimeter('shape5', 6);
        instance.setVolume('shape5', 7);

        instance.remove('shape5');

        expect(instance.getArea('shape5')).toBeUndefined();
        expect(instance.getPerimeter('shape5')).toBeUndefined();
        expect(instance.getVolume('shape5')).toBeUndefined();
    });

    it('should not throw when removing a non-existent id', () => {
        expect(() => instance.remove('not-there')).not.toThrow();
    });

    it('warehouse singleton export should work', () => {
        warehouse.setArea('shape6', 123);

        expect(warehouse.getArea('shape6')).toBe(123);
    });
});