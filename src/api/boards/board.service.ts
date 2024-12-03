import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { Boards } from "../../model/projects/boards.entity";
import { boardRepository } from "./boardRepository";
import { listRepository } from "../lists/listRepository";
import { projectRepository } from "../projects/projectRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";

import { checkArchive } from "../../services/checkArchive.service";
import cacheService from "../../services/cache.service";
// import { cache } from "../../services/cacheService";
import { generateJwt, verifyJwt } from "../../services/jwt.service";
import { Login, Token, AuthenticatedRequest } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime.service";
import mailService from "../../services/sendEmail.service";

export const boardService = {
  async createBoard(
    userId: string,
    projectId: string,
    boardData: Boards
  ): Promise<ServiceResponse<Boards | null>> {
    try {
      console.log("boardData:", boardData);
      console.log("userid: ", userId);

      const project = await projectRepository.findByIdAsync(projectId);

      if (!project) {
        throw new Error("Project not found");
      }
      const board = await boardRepository.createBoardAsync(userId, {
        ...boardData,
        project,
      });
      console.log("finish create board at service ");
      return new ServiceResponse<Boards>(
        ResponseStatus.Success,
        "Board created successfully",
        board,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating board: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async updateBoard(
    userId: string,
    boardId: string,
    boardData: Boards
  ): Promise<ServiceResponse<Boards | null>> {
    try {
      console.log("boardData:", boardData);
      console.log("userId: ", userId);

      const updatedBoard = await boardRepository.updateBoardAsync(
        boardId,
        boardData
      );

      console.log("finish update board at service ");
      if (!updatedBoard) {
        throw new Error("Board not found");
      }
      return new ServiceResponse<Boards>(
        ResponseStatus.Success,
        "Board updated successfully",
        updatedBoard,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating board: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async archiveBoard(
    userId: string,
    boardId: string,
    archive: boolean
  ): Promise<ServiceResponse<Boards | null>> {
    try {
      const boardData = { is_archive: archive };
      console.log("boardData:", boardData);
      console.log("userId: ", userId);

      const updatedBoard = await boardRepository.updateBoardAsync(
        boardId,
        boardData
      );

      console.log("finish archive board at service ");
      if (!updatedBoard) {
        throw new Error("Board not found");
      }
      return new ServiceResponse<Boards>(
        ResponseStatus.Success,
        "Board archived successfully",
        updatedBoard,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error archiving board: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  async sortLists(
    userId: string,
    boardId: string,
    listArray: string[]
  ): Promise<ServiceResponse<string[] | null>> {
    try {
      console.log("listArray:", listArray);
      console.log("userId: ", userId);

      listArray.forEach(async (listId, index) => {
        const isListExist = await listRepository.findByIdAsync(listId);
        if (!isListExist) {
          throw new Error("List not found");
        }
        //check the condition when use with findOneBy
        const isListInBoard = await listRepository.findOneBy({
          id: listId,
          board: { id: boardId },
        });
        if (!isListInBoard) {
          throw new Error("List is not in board");
        }
        const updatedList = await listRepository.updateListAsync(listId, {
          position: index,
        });
        if (!updatedList) {
          throw new Error("Can't update list with id: " + listId);
        }
      });

      console.log("finish sort list at service ");

      return new ServiceResponse<string[]>(
        ResponseStatus.Success,
        "List in board sorted successfully",
        listArray,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error sort list in board: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
