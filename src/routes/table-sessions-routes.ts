import { TableSessionController } from "@/controllers/table-session-controller";
import { Router } from "express";

const tableSessionsRoutes = Router();
const tableSessionController = new TableSessionController();

tableSessionsRoutes.get("/", tableSessionController.index);
tableSessionsRoutes.post("/", tableSessionController.create);
tableSessionsRoutes.patch("/:id", tableSessionController.update);

export { tableSessionsRoutes };
