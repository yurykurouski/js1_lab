import path from 'path';
import { ShapeFactory } from './factories/ShapeFactory';
import { logger } from './utils/logger';
import { Cube } from './entities/Cube';
import { Oval } from './entities/Oval';
import { dataReader } from './fs/DataReader';

const dataPath = process.env.DATA_PATH ?? 'data/shapes.txt';
const filePath = path.join(__dirname, '..', dataPath);

function processShapesFromFile(filePath: string): (Cube | Oval)[] {
  const lines = dataReader.readFileLines(filePath);
  const shapes: (Cube | Oval)[] = [];

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
