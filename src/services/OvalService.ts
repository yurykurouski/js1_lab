import { Oval } from '../entities/Oval';
import { ShapeService } from './ShapeService';

export class OvalService implements ShapeService<Oval> {
  public calculateArea(oval: Oval): number | undefined {
    const { a, b } = this.getAxes(oval);

    return Math.PI * a * b;
  }

  public getAxes(oval: Oval): { a: number; b: number } {
    const a = Math.abs(oval.point.x - oval.point1.x) / 2;
    const b = Math.abs(oval.point.y - oval.point1.y) / 2;
    return { a, b };
  }

  public calculatePerimeter(oval: Oval): number {
    const { a, b } = this.getAxes(oval);

    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }

  public isCircle(oval: Oval): boolean {
    const { a, b } = this.getAxes(oval);
    return a === b;
  }

  public isValidOval(oval: Oval): boolean {
    return oval.point.x !== oval.point1.x && oval.point.y !== oval.point1.y;
  }

  public intersectsExactlyOneAxis(oval: Oval): boolean {
    const minX = Math.min(oval.point.x, oval.point1.x);
    const maxX = Math.max(oval.point.x, oval.point1.x);
    const minY = Math.min(oval.point.y, oval.point1.y);
    const maxY = Math.max(oval.point.y, oval.point1.y);

    const crossesOX = minY < 0 && maxY > 0;
    const crossesOY = minX < 0 && maxX > 0;

    return (crossesOX && !crossesOY) || (crossesOY && !crossesOX);
  }
}

export const ovalService = new OvalService();
