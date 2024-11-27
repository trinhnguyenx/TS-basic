import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { Boards } from "../../model/projects/boards.entity";
import { boardRepository } from "./boardRepository";
import { projectRepository } from "../projects/projectRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";

import cacheService from "../../services/cacheService";
// import { cache } from "../../services/cacheService";
import { generateJwt, verifyJwt } from "../../services/jwtService";
import { Login, Token, AuthenticatedRequest } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime";
import mailService from "../../services/sendEmail";

export const boardService = {
  async createBoard(
    userId: string,
    projectId: string,
    boardData: Boards
  ): Promise<ServiceResponse<Boards | null>> {
    try {
      console.log("boardData:", boardData);
      console.log("userid: ", userId);

      const isProjectExist = await projectRepository.findByIdAsync(projectId);

      if(!isProjectExist){
        throw new Error("Project not found");
      }
      const board = await boardRepository.createBoardAsync(
        userId,
        boardData
      );
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
        StatusCodes.CREATED
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
        StatusCodes.CREATED
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
};
