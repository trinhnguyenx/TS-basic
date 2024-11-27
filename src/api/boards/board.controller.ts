import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { boardService } from "./board.service";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Profile, decoded } from "../user/user.interface";
import { Boards } from "../../model/projects/boards.entity";
import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse";

export const BoardController = {
  async createBoard(req: AuthenticatedRequest, res: Response) {
    try {
      const boardData = {...req.body, projectId: req.params.projectId};
      const projectId = req.params.projectId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const serviceResponse = await boardService.createBoard(
        (req.user as decoded).userId,
        projectId,
        boardData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error create board: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async updateBoard(req: AuthenticatedRequest, res: Response) {
    try {
      const boardData = req.body;
      const boardId = req.params.boardId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await boardService.updateBoard(
        (req.user as decoded).userId,
        boardId,
        boardData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error update board data: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveBoard(req: AuthenticatedRequest, res: Response) {
    try {
      const isArchive = true;
      const boardId = req.params.boardId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await boardService.archiveBoard(
        (req.user as decoded).userId,
        boardId,
        isArchive
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archive board: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
};
