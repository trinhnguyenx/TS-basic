import { NextFunction, Request, Response } from "express";
import { userRepository } from "../api/user/userRepository";

import { verifyJwt } from "../services/jwt.service";
import { AuthenticatedRequest } from "../api/auth/auth.interface";

const accountIsActivated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userEmail = req.body.email;
    const user = await userRepository.findByEmailAsync(userEmail);
    if (!user) {
      res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
      return;
    }
    if (user.isActivated == 0) {
      res.status(403).json({
        status: "Failed",
        message: "Account is not activated",
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default accountIsActivated;
