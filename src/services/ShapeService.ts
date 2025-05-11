import { Shape } from "../entities/Shape";


export abstract class ShapeService<T extends Shape> {
    abstract calculateArea(shape: T): number | undefined;
    abstract calculatePerimeter(shape: T): number | undefined;
}
