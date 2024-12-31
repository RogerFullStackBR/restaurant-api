import { Request, Response, NextFunction } from "express";
import { knex } from "@/database/knex";

class TableController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const listTables = await knex<TableRepository>("tables")
        .select()
        .orderBy("table_number");
      response.status(200).json({ listTables });
    } catch (error) {
      next(error);
    }
  }
}

export { TableController };
