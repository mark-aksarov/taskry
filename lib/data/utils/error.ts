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
