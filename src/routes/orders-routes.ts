import { OrderController } from "@/controllers/order-controller";
import { Router } from "express";

const ordersRoutes = Router();
const orderController = new OrderController();

ordersRoutes.get("/table-session/:table_session_id", orderController.index);
ordersRoutes.get(
  "/table-session/:table_session_id/total",
  orderController.show
);
ordersRoutes.post("/", orderController.create);

export { ordersRoutes };
