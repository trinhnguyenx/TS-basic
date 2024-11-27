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

export default projectRouter;
