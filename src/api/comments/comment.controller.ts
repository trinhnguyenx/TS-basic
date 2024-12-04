import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CommentService } from "./comment.service";

import { ResponseStatus } from "../../services/serviceResponse.service";
import { decoded } from "../user/user.interface";
import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse.service";

export const CommentController = {
  async addComment(req: AuthenticatedRequest, res: Response) {
    try {
      const cardId: string = req.params.cardId;
      const content: string = req.body.content;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await CommentService.addComment(
        (req.user as decoded).userId,
        cardId,
        content
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error add comment to card: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async deleteComment(req: AuthenticatedRequest, res: Response) {
    try {
      // const isArchive = true;
      const commentId: string = req.params.commentId;
      const content: string = req.body.content;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await CommentService.deleteComment(
        (req.user as decoded).userId,
        commentId,
        content
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error add comment to card: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.NOT_FOUND).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
};
