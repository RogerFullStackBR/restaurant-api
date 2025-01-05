import { Router } from "express";
import { productsRoutes } from "./products-routes";
import { tablesRoutes } from "./tables-routes";
import { tableSessionsRoutes } from "./table-sessions-routes";
import { ordersRoutes } from "./orders-routes";

export const routes = Router();
routes.use("/products", productsRoutes);
routes.use("/tables", tablesRoutes);
routes.use("/sessions", tableSessionsRoutes);
routes.use("/orders", ordersRoutes);
