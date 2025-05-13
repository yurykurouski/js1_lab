import { TShapeMetrics } from "./types";

export class Warehouse {
    private static instance: Warehouse;
    private storage: Map<string, TShapeMetrics>

    private constructor() {
        this.storage = new Map();
    }

    public static getInstance(): Warehouse {
        if (!Warehouse.instance) {
            Warehouse.instance = new Warehouse();
        }
        return Warehouse.instance;
    }

    public setArea(id: string, area: number): void {
        this.ensureMetrics(id);
        this.storage.get(id)!.area = area;
    }

    public setPerimeter(id: string, perimeter: number): void {
        this.ensureMetrics(id);
        this.storage.get(id)!.perimeter = perimeter;
    }

    public setVolume(id: string, volume: number): void {
        this.ensureMetrics(id);
        this.storage.get(id)!.volume = volume;
    }

    public getArea(id: string): number | undefined {
        return this.storage.get(id)?.area;
    }

    public getPerimeter(id: string): number | undefined {
        return this.storage.get(id)?.perimeter;
    }

    public getVolume(id: string): number | undefined {
        return this.storage.get(id)?.volume;
    }

    public remove(id: string): void {
        this.storage.delete(id);
    }

    private ensureMetrics(id: string): void {
        if (!this.storage.has(id)) {
            this.storage.set(id, {});
        }
    }
}

export const warehouse = Warehouse.getInstance();
