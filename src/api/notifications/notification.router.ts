import { Router } from "express";
import { NotificationController } from "./notification.controller";
// import { canAccessBy } from "../../middleware/checkpermission";
import authenticateJWT from "../../middleware/authencation";
const notificationRouter = Router();

notificationRouter.get("/", authenticateJWT, NotificationController.getNotificationByUserId);
notificationRouter.post("/:notificationId", authenticateJWT, NotificationController.updateNotification);

export default notificationRouter;