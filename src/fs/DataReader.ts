import fs from 'fs';
import { logger } from '../utils/logger';

class DataReader {
  readFileLines(file: string): string[] {
    try {
      const data = fs.readFileSync(file, 'utf-8');

      return data
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    } catch (error) {
      logger.error(`Error reading file: ${(error as Error).message}`);

      return [];
    }
  }
}

export const dataReader = new DataReader();
