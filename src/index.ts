import express, { Express, Request, Response, NextFunction } from "express";
import authRouter from "./api/auth/auth.router";
import userRouter from "./api/user/user.router";
import projectRouter from "./api/projects/project.router";
import boardRouter from "./api/boards/board.router";
import listRouter from "./api/lists/list.router";
import cardRouter from "./api/cards/card.router";
import commentRouter from "./api/comments/comments.router";
import dataSource from "./config/typeorm.config";
import { pino } from "pino";
import { seedData } from "./config/seeder.config";

const app: Express = express();
const port = 3000;
app.use(express.json());

const logger = pino({ name: "server start" });

async function startApp() {
  try {
    await dataSource.initialize();
    logger.info("Data Source has been initialized!");

    await seedData(dataSource);
  } catch (error) {
    const errorMessage = `Error during Data Source initialization:, ${
      (error as Error).message
    }`;
    logger.error(errorMessage);
  }
}
startApp();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/projects", projectRouter)
app.use("/",boardRouter);
app.use("/", listRouter);
app.use("/", cardRouter);
app.use("/", commentRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
