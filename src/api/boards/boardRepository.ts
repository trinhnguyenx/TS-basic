import { Boards } from "../../model/projects/boards.entity";
import { Users } from "../../model/users.entity";
import { BoardMembers } from "../../model/projects/boardMembers.entity";
import { RoleType } from "../../model/base/roleType.entity";

import dataSource from "../../config/typeorm.config";

export const boardRepository = dataSource.getRepository(Boards).extend({
  async findAllAsync(): Promise<Boards[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Boards | null> {
    return this.findOneBy({ id: id });
  },

  async createBoardAsync(
    userId: string,
    boardData: Partial<Boards>
  ): Promise<Boards> {
    // const newBoard = this.create({
    // ...boardData,
    // });
    // return this.save(newBoard);
    return await dataSource.transaction(async (manager) => {
      const board = await manager.create(Boards, boardData);
      // console.log("finish create board at repo");
      const savedBoard = await manager.save(board);

      // console.log("finish save board at repo");
      const user = await manager.findOne(Users, { where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }
      const boardMember = manager.create(BoardMembers, {
        
        user: user,
        board: savedBoard, // typeORM will auto extract id from savedBoard, or can use { id: savedBoard.id }
      });
      // console.log("finish create boardMember at repo");
      const savedBoardMember = await manager.save(boardMember);
      // console.log("finish save boardMember at repo: ", savedBoardMember);
      return savedBoard;
    });
  },

  async updateBoardAsync(
    id: string,
    updateData: Partial<Boards>
  ): Promise<Boards | null> {
    const updatedBoard = await this.update(id, updateData);

    return this.findOneBy({ id: id });

    // return this.findOneBy({ id });
  },

  async deleteBoardAsync(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  },

  async getBoardMemberAsync(userId: string, boardId: string): Promise<BoardMembers|null> {
    const boardMember = await dataSource
      .getRepository(BoardMembers)
      .findOne({ where: { user: { id: userId }, board: { id: boardId } } });

    // return !!boardMember; // first ! turn null into true and <object> into false, second ! turn true into false and false into true
    return boardMember;
  },
   
  async addBoardMemberAsync(userId: string, boardId: string): Promise<BoardMembers> {
    const boardMember = dataSource.getRepository(BoardMembers).create({
      
      user: { id: userId },
      board: { id: boardId },
    });
    return dataSource.getRepository(BoardMembers).save(boardMember);
  }
});
