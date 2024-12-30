import express, { Request, Response } from "express";
// import { router } from "@/routes"

const PORT = 3333;
const app = express();
app.use(express.json());

app.get("/restaurants", (request: Request, response: Response) => {
  response.json({ message: "Oh Lord!" });
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
