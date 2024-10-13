import { Router } from "express";
import { AuthController } from "../auth/auth.controller";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/user/:id", AuthController.getUser);

export default authRouter;
