import { projectRepository } from "../api/projects/projectRepository";
import { boardRepository } from "../api/boards/boardRepository";
import { listRepository } from "../api/lists/listRepository";
import { cardRepository } from "../api/cards/cardRepository";

export const checkArchive = async (tableName:string, objectId:string ):Promise<boolean> => {
    switch (tableName) {
        case "project":
            const project = await projectRepository.findByIdAsync(objectId);
            return project?.is_archive || false;
        case "board":
            const board = await boardRepository.findByIdAsync(objectId);
            return board?.is_archive || false;
        case "list":
            const list = await listRepository.findByIdAsync(objectId);
            return list?.is_archive || false;
        case "card":
            const card = await cardRepository.findByIdAsync(objectId);
            return card?.is_archive || false;
        default:
            return false;
    }    
};