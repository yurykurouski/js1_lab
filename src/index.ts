import path from 'path';
import { ShapeFactory } from './factories/ShapeFactory';
import { logger } from './utils/logger';
import { Shape } from './entities/Shape';
import { dataReader } from './fs/DataReader';

const dataPath = process.env.DATA_PATH ?? 'data/shapes.txt';
const filePath = path.join(__dirname, '..', dataPath);

function processShapesFromFile(filePath: string): Shape[] {
  const lines = dataReader.readFileLines(filePath);
  const shapes: Shape[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const id = `shape-${i + 1}`;

    const shape = ShapeFactory.createShapeFromLine(line, id);

    if (shape) {
      logger.info(
        `✅ Successfully created shape: ${shape.constructor.name} (id: ${shape.id})`,
      );
      shapes.push(shape);
    } else {
      logger.warn(`⚠️ Line skipped (${id}): ${line}`);
    }
  }

  return shapes;
}

const shapes = processShapesFromFile(filePath);

logger.info(`🎉 Summary: shapes created: ${shapes.length}`);
