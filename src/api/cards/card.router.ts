import { Router } from "express";
import { CardController } from "./card.controller";
// import { canAccessBy } from "../../middleware/checkpermission";
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

cardRouter.patch("cards/:cardId:/assign", authenticateJWT, CardController.assignCard);

export default cardRouter;
