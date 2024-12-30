import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      response.json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
