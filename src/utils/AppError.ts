// src/utils/AppError.js
class AppError extends Error {
    constructor(message:any, public statusCode:number = 500, public isOperational:boolean = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // known error
    }
  }
  
export default AppError;