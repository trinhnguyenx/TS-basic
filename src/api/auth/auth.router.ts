import { Router } from "express";
import { AuthController } from "../auth/auth.controller";
import { canAccessBy } from "../../middleware/checkpermission";
const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/user/:id", canAccessBy(['read']), AuthController.getUser);
authRouter.put("/userroles/:id", AuthController.updateRoleUser);

// authRouter.post('/activate-email', AuthController.activateEmail);

export default authRouter;
