import { Oval } from '../entities/Oval';

export class OvalService {
  static getAxes(oval: Oval): { a: number; b: number } {
    const a = Math.abs(oval.point1.x - oval.point2.x) / 2;
    const b = Math.abs(oval.point1.y - oval.point2.y) / 2;
    return { a, b };
  }

  static calculateArea(oval: Oval): number {
    const { a, b } = this.getAxes(oval);
    return Math.PI * a * b;
  }

  static calculatePerimeter(oval: Oval): number {
    const { a, b } = this.getAxes(oval);

    return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
  }

  static isCircle(oval: Oval): boolean {
    const { a, b } = this.getAxes(oval);
    return a === b;
  }

  static isValidOval(oval: Oval): boolean {
    return oval.point1.x !== oval.point2.x && oval.point1.y !== oval.point2.y;
  }

  static intersectsExactlyOneAxis(oval: Oval): boolean {
    const minX = Math.min(oval.point1.x, oval.point2.x);
    const maxX = Math.max(oval.point1.x, oval.point2.x);
    const minY = Math.min(oval.point1.y, oval.point2.y);
    const maxY = Math.max(oval.point1.y, oval.point2.y);

    const crossesOX = minY < 0 && maxY > 0;
    const crossesOY = minX < 0 && maxX > 0;

    return (crossesOX && !crossesOY) || (crossesOY && !crossesOX);
  }
}
