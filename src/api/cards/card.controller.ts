import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { cardService } from "./card.service";
import { checkUserRole } from "../../services/checkUserRole.service";
import { TrelloEntityType } from "../../model/base/trelloEntityType.entity";
import { RoleType } from "../../model/base/roleType.entity";

import { ResponseStatus } from "../../services/serviceResponse.service";
import { decoded } from "../user/user.interface";

import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse.service";

export const CardController = {
  async createCard(req: AuthenticatedRequest, res: Response) {
    try {
      
      const cardData = req.body;
      const listId = req.params.listId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const serviceResponse = await cardService.createCard(
        (req.user as decoded).userId,
        listId,
        cardData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error create card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async updateCard(req: AuthenticatedRequest, res: Response) {
    try {
      const cardData = req.body;
      const cardId = req.params.cardId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await cardService.updateCard(
        (req.user as decoded).userId,
        cardId,
        cardData
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error update card data: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async archiveCard(req: AuthenticatedRequest, res: Response) {
    try {
      const isArchive = true;
      const cardId = req.params.cardId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const serviceResponse = await cardService.archiveCard(
        (req.user as decoded).userId,
        cardId,
        isArchive
      );
      console.log("finish serviceResponse at controller");

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error archive card: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async addMemberToCard(req: AuthenticatedRequest, res: Response) {
    try {
      const memberId = req.body.userId;

      const cardId = req.params.cardId;

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const checkRole = await checkUserRole(
        TrelloEntityType.PROJECT,
        cardId,
        userId,
        RoleType.ADMIN
      );
      if (!checkRole) {
        throw "Unauthorized";
      }

      const serviceResponse = await cardService.addMemberToCard(
        (req.user as decoded).userId,
        cardId,
        memberId
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error add member to card: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },
  async deleteMemberFromCard(req: AuthenticatedRequest, res: Response) {
    try {
      const memberId = req.params.userId;

      const cardId = req.params.cardId;
    

      if (!req.user) {
        throw "Unauthorized";
      }
      const userId = (req.user as decoded).userId;

      const checkRole = await checkUserRole(
        TrelloEntityType.PROJECT,
        cardId,
        userId,
        RoleType.ADMIN
      );
      if (!checkRole) {
        throw "Unauthorized";
      }

      const serviceResponse = await cardService.deleteMemberFromCard(
        (req.user as decoded).userId,
        cardId,
        memberId
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error delete member from card: ${
        (error as Error).message
      }`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: ResponseStatus.Failed,
        message: errorMessage,
        data: null,
      });
    }
  },

  //not finished
  // async assignCard(req: AuthenticatedRequest, res: Response) {
  //   try {
  //     const isArchive = true;
  //     const cardId = req.params.cardId;

  //     if (!req.user) {
  //       throw "Unauthorized";
  //     }
  //     const userId = (req.user as decoded).userId;

  //     const serviceResponse = await cardService.archiveCard(
  //       (req.user as decoded).userId,
  //       cardId,
  //       isArchive
  //     );
  //     console.log("finish serviceResponse at controller");

  //     handleServiceResponse(serviceResponse, res);
  //   } catch (error) {
  //     const errorMessage = `Error archive card: ${(error as Error).message}`;
  //     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
  //       status: ResponseStatus.Failed,
  //       message: errorMessage,
  //       data: null,
  //     });
  //   }
  // },
};
