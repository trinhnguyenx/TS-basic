import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { Cards } from "../../model/projects/cards.entity";
import { cardRepository } from "./cardRepository";
import { listRepository } from "../lists/listRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";

import cacheService from "../../services/cache.service";
// import { cache } from "../../services/cacheService";
import { generateJwt, verifyJwt } from "../../services/jwt.service";
import { Login, Token, AuthenticatedRequest } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime.service";
import mailService from "../../services/sendEmail.service";

export const cardService = {
  async createCard(
    userId: string,
    listId: string,
    cardData: Cards
  ): Promise<ServiceResponse<Cards | null>> {
    try {
      console.log("cardData:", cardData);
      console.log("userid: ", userId);

      const list = await listRepository.findByIdAsync(listId);

      if (!list) {
        throw new Error("Project not found");
      }
      const card = await cardRepository.createCardAsync(userId, {
        ...cardData,
        list,
      });
      console.log("finish create card at service ");
      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "Card created successfully",
        card,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async updateCard(
    userId: string,
    cardId: string,
    cardData: Cards
  ): Promise<ServiceResponse<Cards | null>> {
    try {
      console.log("cardData:", cardData);
      console.log("userId: ", userId);

      const updatedCard = await cardRepository.updateCardAsync(
        cardId,
        cardData
      );

      console.log("finish update card at service ");
      if (!updatedCard) {
        throw new Error("Card not found");
      }
      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "Card updated successfully",
        updatedCard,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async archiveCard(
    userId: string,
    cardId: string,
    archive: boolean
  ): Promise<ServiceResponse<Cards | null>> {
    try {
      const cardData = { is_archive: archive };
      console.log("cardData:", cardData);
      console.log("userId: ", userId);

      const updatedCard = await cardRepository.updateCardAsync(
        cardId,
        cardData
      );

      console.log("finish archive card at service ");
      if (!updatedCard) {
        throw new Error("Card not found");
      }
      return new ServiceResponse<Cards>(
        ResponseStatus.Success,
        "Card archived successfully",
        updatedCard,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error archiving card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
