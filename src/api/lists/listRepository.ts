import { Lists } from "../../model/projects/lists.entity";
import { Users } from "../../model/users.entity";
// import { ListMembers } from "../../model/project/listMembers.entity";
import { RoleType } from "../../model/base/roleType.entity";

import dataSource from "../../config/typeorm.config";

export const listRepository = dataSource.getRepository(Lists).extend({
  async findAllAsync(): Promise<Lists[]> {
    return this.find();
  },

  async findByIdAsync(id: string): Promise<Lists | null> {
    return this.findOneBy({ id: id });
  },

  async createListAsync(
    userId: string,
    listData: Partial<Lists>
  ): Promise<Lists> {
    // const newList = this.create({
    // ...listData,
    // });
    // return this.save(newList);
    return await dataSource.transaction(async (manager) => {
      const list = await manager.create(Lists, listData);
      // console.log("finish create list at repo");
      const savedList = await manager.save(list);

      // console.log("finish save list at repo");
      // const user = await manager.findOne(Users, { where: { id: userId } });
      // if (!user) {
      //   throw new Error("User not found");
      // }
    //   const listMember = manager.create(ListMembers, {
    //     user: user,
    //     list: savedList, // typeORM will auto extract id from savedList, or can use { id: savedList.id }
    //   });
    //   // console.log("finish create listMember at repo");
    //   const savedListMember = await manager.save(listMember);
      // console.log("finish save listMember at repo: ", savedListMember);
      return savedList;
    });
  },

  async updateListAsync(
    id: string,
    updateData: Partial<Lists>
  ): Promise<Lists | null> {
    const updatedList = await this.update(id, updateData);

    return this.findOneBy({ id: id });

    // return this.findOneBy({ id });
  },

  async deleteListAsync(id: string): Promise<boolean> {
    await this.delete(id);
    return true;
  },
});
