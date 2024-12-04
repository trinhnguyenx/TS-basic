import { Comments } from "../../model/projects/comments.entity";
import { cardRepository } from "../../api/cards/cardRepository";

import { commentRepository } from "./commentRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";

export const CommentService = {
  async addComment(
    userId: string,
    cardId: string,
    content: string
  ): Promise<ServiceResponse<Comments | null>> {
    try {
      const isCardExist = await cardRepository.findByIdAsync(cardId);

      if (!isCardExist) {
        throw new Error("Card not found");
      }
      const comment = await commentRepository.createCommentAsync(
        userId,
        cardId,
        content
      );
      if (!comment) {
        throw new Error("Can't create comment");
      }
      return new ServiceResponse<Comments>(
        ResponseStatus.Success,
        "Add comment to card successfully",
        comment,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error add comment to card: ${
        (ex as Error).message
      }`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async deleteComment(
    userId: string,
    commentId: string,
    content: string
  ): Promise<ServiceResponse<Comments | null>> {
    try {
      const isCommentExist = await commentRepository.findByIdAsync(commentId);

      if (!isCommentExist) {
        throw new Error("comment not found");
      }
      const comment = await commentRepository.deleteCommentAsync(commentId);
      if (!comment) {
        throw new Error("Can't delete comment");
      }
      return new ServiceResponse<Comments>(
        ResponseStatus.Success,
        "Delete comment from card successfully",
        isCommentExist,
        StatusCodes.OK
      );
    } catch (ex) {
      if (((ex as Error).message = "comment not found")) {
        const errorMessage1 = `Error delete comment from card: ${
          (ex as Error).message
        }`;
        return new ServiceResponse(
          ResponseStatus.Failed,
          errorMessage1,
          null,
          StatusCodes.NOT_FOUND
        );
      } else {
        const errorMessage = `Error delete comment from card: ${
          (ex as Error).message
        }`;
        return new ServiceResponse(
          ResponseStatus.Failed,
          errorMessage,
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
    }
  },
};
