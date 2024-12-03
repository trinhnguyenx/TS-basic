import { Cards } from "../../model/projects/cards.entity";
import { Users } from "../../model/users.entity";
import { CardMembers } from "../../model/projects/cardMembers.entity";
import { RoleType } from "../../model/base/roleType.entity";

import dataSource from "../../config/typeorm.config";

export const cardRepository = dataSource.getRepository(Cards).extend({
  async findAllAsync(): Promise<Cards[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Cards | null> {
    return this.findOneBy({ id: id });
  },

  async createCardAsync(
    userId: string,
    cardData: Partial<Cards>
  ): Promise<Cards> {
    // const newCard = this.create({
    // ...cardData,
    // });
    // return this.save(newCard);
    return await dataSource.transaction(async (manager) => {
      const card = await manager.create(Cards, cardData);
      // console.log("finish create card at repo");
      const savedCard = await manager.save(card);

      // console.log("finish save card at repo");
      const user = await manager.findOne(Users, { where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }
        const cardMember = manager.create(CardMembers, {
          user: user,
          card: savedCard, // typeORM will auto extract id from savedCard, or can use { id: savedCard.id }
        });
        // console.log("finish create cardMember at repo");
        const savedCardMember = await manager.save(cardMember);
      console.log("finish save cardMember at repo: ", savedCardMember);
      return savedCard;
    });
  },

  async updateCardAsync(
    id: string,
    updateData: Partial<Cards>
  ): Promise<Cards | null> {
    const updatedCard = await this.update(id, updateData);

    return this.findOneBy({ id: id });

    // return this.findOneBy({ id });
  },

  async deleteCardAsync(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  },
});
