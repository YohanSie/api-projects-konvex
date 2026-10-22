import express from "express";
import projectRoutes from "./modules/projects/project.routes.js";
import {errorMiddleware} from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({
        status: "ok"
    });
});

app.use("/projetos", projectRoutes);

app.use(errorMiddleware);

export default app;