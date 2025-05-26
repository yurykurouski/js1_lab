import { Shape } from '../entities/Shape';

import { TShapeComparator } from './types';

export class ShapeComparators {
    static byId<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => a.id.localeCompare(b.id);
    }

    static byType<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => {
            const nameA = a.type;
            const nameB = b.type;

            return nameA.localeCompare(nameB);
        }
    }

    static byFirstPointX<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => a.point.x - b.point.x;
    }

    static byFirstPointY<T extends Shape>(): TShapeComparator<T> {
        return (a, b) => a.point.y - b.point.y;
    }
}