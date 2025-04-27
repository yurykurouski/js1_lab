export class InvalidShapeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidInputException extends InvalidShapeError {
  constructor(message: string) {
    super(`Invalid input: ${message}`);
  }
}

export class InvalidShapeException extends InvalidShapeError {
  constructor(message: string) {
    super(`Invalid shape: ${message}`);
  }
}

export class FileOperationException extends InvalidShapeError {
  constructor(message: string) {
    super(`File operation error: ${message}`);
  }
}
