import express from "express";
import projectRoutes from "./modules/projects/project.routes.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/projetos", projectRoutes);

app.use(errorMiddleware);

export default app;