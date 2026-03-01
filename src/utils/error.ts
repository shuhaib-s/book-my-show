import AppError from "./AppError";

export class ValidationError extends AppError {
  constructor(message:any) {
    super(message, 400);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(message:any) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message:any) {
    super(message, 409);
    this.name = "ConflictError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message:any) {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message:any) {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}