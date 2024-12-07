
import { Lists } from "../../model/projects/lists.entity";
import { listRepository } from "./listRepository";
import { boardRepository } from "../boards/boardRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";



export const listService = {
  async createList(
    userId: string,
    boardId: string,
    listData: Lists
  ): Promise<ServiceResponse<Lists | null>> {
    try {
      console.log("listData:", listData);
      console.log("userid: ", userId);

      const board = await boardRepository.findByIdAsync(boardId);
      if (!board) {
        throw new Error("Board not found");
      }
      const list = await listRepository.createListAsync(userId, {
        ...listData,
        board,
      });
      console.log("finish create list at service ");
      return new ServiceResponse<Lists>(
        ResponseStatus.Success,
        "List created successfully",
        list,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating list: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async updateList(
    userId: string,
    listId: string,
    listData: Lists
  ): Promise<ServiceResponse<Lists | null>> {
    try {
      console.log("listData:", listData);
      console.log("userId: ", userId);

      const updatedList = await listRepository.updateListAsync(
        listId,
        listData
      );

      console.log("finish update list at service ");
      if (!updatedList) {
        throw new Error("List not found");
      }
      return new ServiceResponse<Lists>(
        ResponseStatus.Success,
        "List updated successfully",
        updatedList,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating list: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async archiveList(
    userId: string,
    listId: string,
    archive: boolean
  ): Promise<ServiceResponse<Lists | null>> {
    try {
      const listData = { is_archive: archive };
      console.log("listData:", listData);
      console.log("userId: ", userId);

      const updatedList = await listRepository.updateListAsync(
        listId,
        listData
      );

      console.log("finish archive list at service ");
      if (!updatedList) {
        throw new Error("List not found");
      }
      return new ServiceResponse<Lists>(
        ResponseStatus.Success,
        "List archived successfully",
        updatedList,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error archiving list: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
