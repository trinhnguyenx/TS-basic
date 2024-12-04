import { Cards } from "../../model/projects/cards.entity";
import { Users } from "../../model/users.entity";

import { Comments } from "../../model/projects/comments.entity";

import dataSource from "../../config/typeorm.config";

export const commentRepository = dataSource.getRepository(Comments).extend({
  async findAllAsync(): Promise<Comments[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Comments | null> {
    return this.findOneBy({ id: id });
  },

  async createCommentAsync(
    userId: string,
    cardId: string,
    content: string
  ): Promise<Comments | null> {
    const user = await dataSource
      .getRepository(Users)
      .findOne({ where: { id: userId } });
    const card = await dataSource
      .getRepository(Cards)
      .findOne({ where: { id: cardId } });
    if (!user) {
      throw new Error("user not available");
    }
    if (!card) {
      throw new Error("card not available");
    }
    const newComment = this.create({
      content: content,
      user: user,
      card: card,
    });
    return this.save(newComment);
  },
  async deleteCommentAsync(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  },
});
