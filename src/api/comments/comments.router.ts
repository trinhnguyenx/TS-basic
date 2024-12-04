import { Router } from "express";
import { CommentController } from "./comment.controller";
import authenticateJWT from "../../middleware/authencation";
const commentRouter = Router();

commentRouter.post(
  "/cards/:cardId/comments",
  authenticateJWT,
  CommentController.addComment
);

commentRouter.delete(
  "/comments/:commentId",
  authenticateJWT,
  CommentController.deleteComment
);

export default commentRouter;
