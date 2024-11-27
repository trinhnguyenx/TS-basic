import { NextFunction, Request, Response } from "express";
import { userRepository } from "../api/user/userRepository";

import { verifyJwt } from "../services/jwtService";
import { AuthenticatedRequest } from "../api/auth/auth.interface";


import { Request, Response, NextFunction } from "express";
import userRepository from "./repositories/userRepository"; // Adjust the import path as needed

const accountIsActivated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userEmail = req.body.email;
    const user = await userRepository.findByEmailAsync(userEmail);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    if (user.isActivated == 0) {
      return res.status(403).json({
        status: "Failed",
        message: "Account is not activated",
      });
    }

    next(); // Call next() if everything is fine
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export default accountIsActivated;