import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { knex } from "@/database/knex";
import { error } from "console";
import { AppError } from "@/utils/AppError";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    try {
      const { name } = request.query;
      const listProducts = await knex<ProductRepository>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`) // % seria o contains
        .orderBy("name");
      response.json({ listProducts });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0), //price: z.number().gt(0, { message: "value must be greater than 0" }),
      });
      const { name, price } = bodySchema.parse(request.body);
      await knex<ProductRepository>("products").insert({ name, price });
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

      const bodySchema = z.object({
        name: z.string().trim().min(6),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);

      const item = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first();
      console.log(`item: ${item}`);
      if (!item) throw new AppError("Product not found");
      await knex<ProductRepository>("products")
        .update({ name, price, updated_at: knex.fn.now() })
        .where({ id });
      response.status(200).json();
    } catch (error) {
      next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      const id = z
        .string()
        .transform((idValue) => Number(idValue))
        .refine((idValue) => !isNaN(idValue), {
          message: "id must be a number",
        })
        .parse(request.params.id);
      const item = await knex<ProductRepository>("products")
        .select()
        .where({ id })
        .first(); // return the item
      if (!item) throw new AppError("Product not found.");
      await knex<ProductRepository>("products").delete().where({ id });
      response.json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };
