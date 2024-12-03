import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { listService } from "./list.service";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Profile, decoded } from "../user/user.interface";
import { Lists } from "../../model/projects/lists.entity";
import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse";

export const ListController = {
  async createList(req: AuthenticatedRequest, res: Response) {
    try {
      // const listData = { ...req.body, boardId: req.params.boardId };
      const listData = req.body;
      const boardId = req.params.boardId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const serviceResponse = await listService.createList(
        (req.user as decoded).userId,
        boardId,
        listData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error create list: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async updateList(req: AuthenticatedRequest, res: Response) {
    try {
      const listData = req.body;
      const listId = req.params.listId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await listService.updateList(
        (req.user as decoded).userId,
        listId,
        listData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error update list data: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveList(req: AuthenticatedRequest, res: Response) {
    try {
      const isArchive = true;
      const listId = req.params.listId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await listService.archiveList(
        (req.user as decoded).userId,
        listId,
        isArchive
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archive list: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
};
