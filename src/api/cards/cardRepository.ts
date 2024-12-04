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
     
      const savedCard = await manager.save(card);

      
      const user = await manager.findOne(Users, { where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }
      const cardMember = manager.create(CardMembers, {
        role: RoleType.ADMIN,
        user: user,
        card: savedCard, // typeORM will auto extract id from savedCard, or can use { id: savedCard.id }
      });
      
      const savedCardMember = await manager.save(cardMember);
      
      return savedCard;
    });
  },

  async updateCardAsync(
    id: string,
    updateData: Partial<Cards>
  ): Promise<Cards | null> {
    const updatedCard = await this.update(id, updateData);

    return this.findOneBy({ id: id });

    
  },

  async deleteCardAsync(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  },

  async getCardMemberAsync(
    userId: string,
    cardId: string
  ): Promise<CardMembers | null> {
    const cardMember = await dataSource
      .getRepository(CardMembers)
      .findOne({ where: { user: { id: userId }, card: { id: cardId } } });

    // return !!cardMember; // first ! turn null into true and <object> into false, second ! turn true into false and false into true
    return cardMember;
  },
  async addCardMemberAsync(
    userId: string,
    cardId: string,
    role: RoleType
  ): Promise<CardMembers> {
    const checkCardMember = await this.getCardMemberAsync(
      userId,
      cardId
    );
    if (checkCardMember) {
      throw new Error("Member already exists in card");
    }
    const cardMember = dataSource.getRepository(CardMembers).create({
      role,
      user: { id: userId },
      card: { id: cardId },
    });
    return dataSource.getRepository(CardMembers).save(cardMember);
  },
  async deleteCardMemberAsync(
    userId: string,
    cardId: string
  ): Promise<boolean> {
    //check if the user is a member of the card
    const cardMember = await this.getCardMemberAsync(userId, cardId);
    if (!cardMember) {
      throw new Error("Member not found in card");
    }

    //delete the card member
    const deleteResult = await dataSource.getRepository(CardMembers).delete({
      user: { id: userId },
      card: { id: cardId },
    });
    return deleteResult.affected !== 0;
  },
});
