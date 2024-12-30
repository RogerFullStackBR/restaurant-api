import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
  }

  response.status(500).json({ message: error.message });
}

export { errorHandling };
