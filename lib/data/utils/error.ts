export class AccessDeniedError extends Error {
  constructor(message?: string) {
    super(message || "Access denied");
    this.name = "AccessDeniedError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends Error {
  code?: string;

  constructor(message?: string, code?: string) {
    super(message || "Not found");
    this.name = "NotFoundError";
    this.code = code;
  }
}

export class ValidationError extends Error {
  constructor(message?: string) {
    super(message || "Validation error");
    this.name = "ValidationError";
  }
}
