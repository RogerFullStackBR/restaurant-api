import { knex } from "@/database/knex";
import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";

class TableSessionController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const sessions = await knex<TableSessionsRepository>("tables_sessions")
        .orderBy("closed_at")
        .select()
        .orderBy("table_id");
      response.json({ sessions });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        table_id: z.number(),
      });

      const { table_id } = bodySchema.parse(request.body);

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .select()
        .where({ table_id })
        .orderBy("opened_at", "desc")
        .first();

      if (session && !session.closed_at) {
        throw new AppError("This table is already open");
      }

      await knex<TableSessionsRepository>("tables_sessions").insert({
        table_id,
        opened_at: knex.fn.now(),
      });

      response.status(201).json();
    } catch (error) {
      next(error);
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((idValue) => Number(idValue))
        .refine((idValue) => !isNaN(idValue), {
          message: "id must be a number",
        })
        .parse(request.params.id);

      const session = await knex<TableSessionsRepository>("tables_sessions")
        .select()
        .where({ id })
        .first();

      if (!session) {
        throw new AppError("Session table not found");
      }

      if (session.closed_at) {
        throw new AppError("Session table is already closed");
      }

      await knex<TableSessionsRepository>("tables_sessions")
        .update({ closed_at: knex.fn.now() })
        .where({ id });
      response.status(200).json();
    } catch (error) {
      next(error);
    }
  }
}

export { TableSessionController };
