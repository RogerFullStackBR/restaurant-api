import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

function errorHandling(
  error: any,
  request: Request,
  response: Response,
  _: NextFunction
) {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    response
      .status(400)
      .json({ message: "validation error", issues: error.format() }); // zod error format
  }

  response.status(500).json({ message: error.message });
}

export { errorHandling };
