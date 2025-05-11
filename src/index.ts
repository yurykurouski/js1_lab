import path from 'path';
import { ShapeFactory } from './factories/ShapeFactory';
import { logger } from './utils/logger';
import { dataReader } from './fs/DataReader';
import { entityRepository } from './repositories/EntityRepository';

const dataPath = process.env.DATA_PATH ?? 'data/shapes.txt';
const filePath = path.join(__dirname, '..', dataPath);

function processShapesFromFile(filePath: string): void {
  const lines = dataReader.readFileLines(filePath);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const id = `shape-${i + 1}`;

    const isAdded = ShapeFactory.createShapeFromLine(line, id);

    if (isAdded) {
      logger.info(
        `✅ Successfully created shape`,
      );

    } else {
      logger.warn(`⚠️ Line skipped (${id}): ${line}`);
    }
  }
}

processShapesFromFile(filePath);

const shapes = entityRepository.getAll();

logger.info(`🎉 Summary: shapes created: ${shapes.length}`);
