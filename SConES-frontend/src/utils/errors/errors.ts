// errors.ts
export class HttpError extends Error {
    constructor(public status: number, message: string) {
      super(message);
    }
  }
  
  export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
    }
  }
  