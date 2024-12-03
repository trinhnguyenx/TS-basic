import { Router } from "express";
import { ListController } from "../lists/list.controller";
// import { canAccessBy } from "../../middleware/checkpermission";
import authenticateJWT from "../../middleware/authencation";
const listRouter = Router();
listRouter.post(
  "/boards/:boardId/lists",
  authenticateJWT,
  ListController.createList
);
listRouter.put("/lists/:listId", authenticateJWT, ListController.updateList);
listRouter.patch(
  "/lists/:listId/archive",
  authenticateJWT,
  ListController.archiveList
);

export default listRouter;
