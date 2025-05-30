import { Shape } from '../entities/Shape';

import { ShapeComparators } from './ShapeComparator';
import { TShapeComparator } from './types';
import { warehouse } from './Warehouse';

export class EntityRepository<T extends Shape> {
  private entities: Map<string, T> = new Map();

  constructor() {
    this.entities = new Map();
  }

  public add(entity: T): boolean {
    this.entities.set(entity.id, entity);

    return true;
  }

  public findById(id: string): T | undefined {
    return this.entities.get(id);
  }

  public findByName(name: string): T | undefined {
    for (const entity of this.entities.values()) {
      if (entity.constructor.name === name) {
        return entity;
      }
    }
    return undefined;
  }

  public getAll(): T[] {
    return Array.from(this.entities.values());
  }

  public remove(id: string): boolean {
    const removed = this.entities.delete(id);
    if (removed) {
      warehouse.remove(id);
    }
    return removed;
  }

  public update(entity: T): boolean {
    if (!this.entities.has(entity.id)) return false;
    this.entities.set(entity.id, entity);
    return true;
  }

  public findShapesInArea(minArea: number, maxArea: number): T[] {
    return Array.from(this.entities.values()).filter((shape) => {
      const area = warehouse.getArea(shape.id);

      if (area === undefined) {
        return false;
      }

      return area >= minArea && area <= maxArea;
    });
  }

  public findShapesInPerimeter(
    minPerimeter: number, maxPerimeter: number): T[] {
    return Array.from(this.entities.values()).filter((shape) => {
      const perimeter = warehouse.getPerimeter(shape.id);

      if (perimeter === undefined) {
        return false;
      }

      return perimeter >= minPerimeter && perimeter <= maxPerimeter;
    });
  }

  public sort(comparator: TShapeComparator<T>): T[] {
    return this.getAll().sort((a, b) => comparator(a, b));
  }

  public sortById(): T[] {
    return this.sort(ShapeComparators.byId<T>());
  }

  public sortByName(): T[] {
    return this.sort(ShapeComparators.byType<T>());
  }

  public sortByFirstPointX(): T[] {
    return this.sort(ShapeComparators.byFirstPointX<T>());
  }

  public sortByFirstPointY(): T[] {
    return this.sort(ShapeComparators.byFirstPointY<T>());
  }
}

export const entityRepository = new EntityRepository<Shape>();
