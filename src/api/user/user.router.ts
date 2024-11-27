import { Router } from "express";
import { UserController } from "../user/user.controller";
import { canAccessBy } from "../../middleware/checkpermission";
import authenticateJWT from "../../middleware/authencation";
const userRouter = Router();


userRouter.post("/profile", authenticateJWT, UserController.updateProfile);


export default userRouter;
