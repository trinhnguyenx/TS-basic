import { Router } from "express";
import { AuthController } from "../auth/auth.controller";
import { canAccessBy } from "../../middleware/checkpermission";
import authenticateJWT from "../../middleware/authencation";
import accountIsActivated from "../../middleware/accountIsActivated";
const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", accountIsActivated, AuthController.login); //check isActivate
authRouter.get("/activate", AuthController.activateEmail);
authRouter.get("/user/:id",authenticateJWT, AuthController.getUser); //lay cua chinh minh thi ko /:id

// authRouter.put("/userroles/:id", AuthController.updateRoleUser);

// authRouter.post('/activate-email', AuthController.activateEmail);

export default authRouter;
