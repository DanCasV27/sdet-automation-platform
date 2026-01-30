export type DomainErrorcODE =
    | 'NOT_FOUND'
    | 'VALIDATION_ERROR'

export class DomainError extends Error {
    public readonly code: DomainErrorcODE;
    public readonly statusCode: number;
    public readonly details?: unknown;

    constructor(message:string,code:DomainErrorcODE,statusCode:number,details?:unknown){
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, DomainError.prototype);
    }
}

export class NotFoundError extends DomainError{
    constructor(entity:string,details?:unknown){
        super(`${entity} not found`,'NOT_FOUND',404,details);
        this.name = 'NotFoundError';
    }
}

export class ValidationError extends DomainError {
    constructor(message: string, details?: unknown) {
      super(message, "VALIDATION_ERROR", 400, details);
      this.name = "ValidationError";
    }
  }
