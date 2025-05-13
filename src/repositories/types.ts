export type TShapeComparator<T> = (
    a: T,
    b: T,
) => number

export type TShapeMetrics = {
    area?: number;
    perimeter?: number;
    volume?: number;
}
