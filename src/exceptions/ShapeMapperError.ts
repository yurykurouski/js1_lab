export class ShapeMapperError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class MethodNotFoundException extends ShapeMapperError {
    constructor(methodName: string, serviceName: string) {
        super(`Method not found: ${methodName} not found in ${serviceName}`);
    }
}
