import { Router } from "express";
import { BoardController } from "../boards/board.controller";
// import { canAccessBy } from "../../middleware/checkpermission";
import authenticateJWT from "../../middleware/authencation";
const boardRouter = Router();
boardRouter.post("/projects/:projectId/boards", authenticateJWT, BoardController.createBoard);
boardRouter.put(
  "/boards/:boardId",
  authenticateJWT,
  BoardController.updateBoard
);
boardRouter.patch(
  "/boards/:boardId/archive",
  authenticateJWT,
  BoardController.archiveBoard
);

export default boardRouter;
