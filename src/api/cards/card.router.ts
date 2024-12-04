import { Router } from "express";
import { CardController } from "./card.controller";

import authenticateJWT from "../../middleware/authencation";
const cardRouter = Router();
cardRouter.post(
  "/lists/:listId/cards",
  authenticateJWT,
  CardController.createCard
);
cardRouter.put("/cards/:cardId", authenticateJWT, CardController.updateCard);

cardRouter.patch(
  "/cards/:cardId/archive",
  authenticateJWT,
  CardController.archiveCard
);

cardRouter.post(
  "/:projectId/members",
  authenticateJWT,
  CardController.addMemberToCard
);

cardRouter.delete(
  "/:projectId/members/:userId",
  authenticateJWT,
  CardController.deleteMemberFromCard
);

export default cardRouter;
