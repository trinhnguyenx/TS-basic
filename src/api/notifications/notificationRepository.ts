
import { Users } from "../../model/users.entity";

import { Notifications } from "../../model/projects/notifications.entity";

import dataSource from "../../config/typeorm.config";

export const notificationRepository = dataSource
  .getRepository(Notifications)
  .extend({
    async findAllAsync(): Promise<Notifications[]> {
      return this.find();
    },

    async findByIdAsync(id: string): Promise<Notifications | null> {
      return this.findOneBy({ id: id });
    },
    async findByUserIdAsync(userId: string): Promise<Notifications[] | null> {
      const user = await dataSource
        .getRepository(Users)
        .findOne({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }
      return this.find({ where: { user: user } });
    },
    async updateNotificationAsync(
      id: string,
      data: Notifications
    ): Promise<Notifications | null> {
      const notification = await this.findOneBy({ id: id });
      if (!notification) {
        throw new Error("Notification not found");
      }
      return this.save({ ...notification, ...data });
    },
    //   async createNotificationAsync(
    //     userId: string,
    //     cardId: string,
    //     message: string
    //   ): Promise<Notifications | null> {
    //     const user = await dataSource
    //       .getRepository(Users)
    //       .findOne({ where: { id: userId } });
    //     const card = await dataSource
    //       .getRepository(Cards)
    //       .findOne({ where: { id: cardId } });
    //     if (!user) {
    //       throw new Error("user not available");
    //     }
    //     if (!card) {
    //       throw new Error("card not available");
    //     }
    //     const newNotification = this.create({
    //       message: message,
    //       user: user,

    //     });
    //     return this.save(newNotification);
    //   },
    async deleteNotificationAsync(id: string): Promise<boolean> {
      await this.delete(id);
      return true;
    },
  });
