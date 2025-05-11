import { Shape } from '../entities/Shape';

import { TShapeComparator } from './types';

export class ShapeComparators {
    static byId<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => a.id.localeCompare(b.id);
    }

    static byName<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => {
            const nameA = a.constructor.name;
            const nameB = b.constructor.name;
            return nameA.localeCompare(nameB);
        }
    }

    static byFirstPointX<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => {
            const getX = (shape: T): number => {
                if (shape.point && typeof shape.point.x === 'number') {
                    return shape.point.x;
                }

                return 0;
            };

            return getX(a) - getX(b);
        };
    }

    static byFirstPointY<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => {
            const getY = (shape: T): number => {
                if (shape.point && typeof shape.point.y === 'number') {
                    return shape.point.y;
                }

                return 0;
            };

            return getY(a) - getY(b);
        }
    }
}