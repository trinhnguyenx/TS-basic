import { RoleType } from "../../model/base/roleType.entity";
import { Cards } from "../../model/projects/cards.entity";
import { CardMembers } from "../../model/projects/cardMembers.entity";
import { cardRepository } from "./cardRepository";
import { listRepository } from "../lists/listRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";

export const cardService = {
  async createCard(
    userId: string,
    listId: string,
    cardData: Cards
  ): Promise<ServiceResponse<Cards | null>> {
    try {
      const list = await listRepository.findByIdAsync(listId);

      if (!list) {
        throw new Error("Project not found");
      }
      const card = await cardRepository.createCardAsync(userId, {
        ...cardData,
        list,
      });

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
      const updatedCard = await cardRepository.updateCardAsync(
        cardId,
        cardData
      );

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

      const updatedCard = await cardRepository.updateCardAsync(
        cardId,
        cardData
      );

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
  async addMemberToCard(
    userId: string,
    cardId: string,
    memberId: string
  ): Promise<ServiceResponse<CardMembers | null>> {
    try {
      const cardMember = await cardRepository.getCardMemberAsync(
        memberId,
        cardId
      );
      if (cardMember) {
        throw new Error("Member already exists in card");
      }
      const addedMember = await cardRepository.addCardMemberAsync(
        memberId,
        cardId,
        RoleType.MEMBER
      );

      if (!addedMember) {
        throw new Error("Can't add member to card");
      }

      return new ServiceResponse<CardMembers>(
        ResponseStatus.Success,
        "Add member to card successfully",
        addedMember,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error add member to card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async deleteMemberFromCard(
    userId: string,
    cardId: string,
    memberId: string
  ): Promise<ServiceResponse<CardMembers | null>> {
    try {
      const cardMember = await cardRepository.getCardMemberAsync(
        memberId,
        cardId
      );
      if (!cardMember) {
        throw new Error("Member not exists in card");
      }

      const deletedMember = await cardRepository.deleteCardMemberAsync(
        memberId,
        cardId
      );

      if (!deletedMember) {
        throw new Error("Can't delete member from card");
      }

      return new ServiceResponse<CardMembers>(
        ResponseStatus.Success,
        "Delete member from card successfully",
        cardMember,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error add member to card: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
