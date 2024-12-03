import { Router } from "express";
import { ProjectController } from "../projects/project.controller";
// import { canAccessBy } from "../../middleware/checkpermission";
import authenticateJWT from "../../middleware/authencation";
const projectRouter = Router();
projectRouter.post("/", authenticateJWT, ProjectController.createProject);
projectRouter.put(
  "/:projectId",
  authenticateJWT,
  ProjectController.updateProject
);
projectRouter.patch(
  "/:projectId/archive",
  authenticateJWT,
  ProjectController.archiveProject
);

projectRouter.post(
  "/:projectId/members",
  authenticateJWT,
  ProjectController.addMemberToProject
);

projectRouter.delete(
  "/:projectId/members/:userId",
  authenticateJWT,
  ProjectController.deleteMemberFromProject
);

export default projectRouter;
