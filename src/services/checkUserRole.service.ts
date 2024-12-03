import { projectRepository } from "../api/projects/projectRepository";
import { boardRepository } from "../api/boards/boardRepository";
import { listRepository } from "../api/lists/listRepository";
import { cardRepository } from "../api/cards/cardRepository";
import { RoleType } from "../model/base/roleType.entity";

export const checkUserRole = async (
  tableName: string,
  objectId: string,
    userId: string,
    role: string
): Promise<boolean> => {
  // console.log("tableName: ", tableName);
  // console.log("objectId: ", objectId);
  // console.log("userId: ", userId);
  // console.log("role: ", role);

  switch (tableName) {
    case "project":
      const projectMember = await projectRepository.getProjectMemberAsync(userId, objectId);
    //   return projectMember?.role || null;
    console.log("projectMember: ", projectMember);
    
    return projectMember?.role == role;
    
    case "card":
      const cardMember = await cardRepository.getCardMemberAsync(userId, objectId);
    //   return cardMember?.role || null;
    return cardMember?.role == role;
    default:
      return false;
  }
};
