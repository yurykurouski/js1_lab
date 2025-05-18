export interface IShapeObserver {
    update(shapeId: string): void;
}

export interface IShapeSubject {
    addObserver(observer: IShapeObserver): void;
    removeObserver(observer: IShapeObserver): void;
    notifyObservers(): void;
}
