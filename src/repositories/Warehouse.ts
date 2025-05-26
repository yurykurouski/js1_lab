import { TShapeMetrics } from "./types";
import { IShapeObserver } from "../entities/Observer";
import { entityRepository } from "./EntityRepository";
import { ShapeMapper } from "../services/ShapeMapper";
import { MethodNotFoundException } from "../exceptions/ShapeMapperError";
import { logger } from "../utils/logger";

export class Warehouse implements IShapeObserver {
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

    public update(id: string): void {
        const entity = entityRepository.findById(id);

        if (!entity) return;

        try {
            const area = ShapeMapper(entity, 'calculateArea');
            const perimeter = ShapeMapper(entity, 'calculatePerimeter');
            const volume = ShapeMapper(entity, 'calculateVolume');

            if (typeof area === 'number') {
                this.setArea(entity.id, area);
            }

            if (typeof perimeter === 'number') {
                this.setPerimeter(entity.id, perimeter);
            }

            if (typeof volume === 'number') {
                this.setVolume(entity.id, volume);
            }
        } catch (error) {
            if (error instanceof MethodNotFoundException) {
                logger.error(`Error updating warehouse for entity ${entity.id}: ${error.message}`);
            } else {
                logger.error(`Unexpected error updating warehouse for entity ${entity.id}`);
            }
        }
    }
}

export const warehouse = Warehouse.getInstance();
