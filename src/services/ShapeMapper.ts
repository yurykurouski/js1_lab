import { Cube } from "../entities/Cube";
import { Oval } from "../entities/Oval";
import { Shape } from "../entities/Shape";
import { MethodNotFoundException } from "../exceptions/ShapeMapperError";
import { cubeService } from "./CubeService";
import { ovalService } from "./OvalService";

export const ShapeMapper = (shape: Shape, methodName: string) => {
    switch (true) {
        case shape instanceof Cube: {
            if (typeof cubeService[methodName as keyof typeof cubeService] !== 'function') {
                throw new MethodNotFoundException(methodName, 'CubeService');
            }

            return cubeService[methodName as keyof typeof cubeService](shape);
        }
        case shape instanceof Oval: {
            if (typeof ovalService[methodName as keyof typeof ovalService] !== 'function') {
                throw new MethodNotFoundException(methodName, 'OvalService');
            }

            return ovalService[methodName as keyof typeof ovalService](shape);
        }
        default:
            throw new Error(`Unknown shape type: ${shape.constructor.name}`);
    }
}
