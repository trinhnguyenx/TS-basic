import bcrypt from "bcryptjs";

import { User } from "../../model/users.entity";
import { userRepository } from "../../api/user/userRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { generateJwt } from "../../services/jwtService";
import { Login, Token } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime";

export const authService = {
  // Register new user
  register: async (userData: User): Promise<ServiceResponse<User | null>> => {
    try {
      const user = await userRepository.findByEmailAsync(userData.email);
      if (user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Email already exists",
          null,
          StatusCodes.BAD_REQUEST
        );
      }
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const newUser = await userRepository.createUserAsync({
        ...userData,
        password: hashedPassword,
      });
      if (!newUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error creating users",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "User registered successfully!",
        newUser,
        StatusCodes.CREATED
      );
    } catch (ex) {
      const errorMessage = `Error creating usersss: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  // Login user
  login: async (loginData: Login): Promise<ServiceResponse<Token | null>> => {
    try {
      const user = await userRepository.findByEmailAsync(loginData.email);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      // Compare hashed password
      const passwordMatch = await bcrypt.compare(
        loginData.password,
        user.password
      ); // Compare entered password with hashed password
      if (!passwordMatch) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Invalid password",
          null,
          StatusCodes.UNAUTHORIZED
        );
      }

      const token: Token = {
        accessToken: generateJwt({ userId: user.id }),
        refreshToken: generateJwt({ userId: user.id }),
        expiresIn: calculateUnixTime(process.env.JWT_EXPIRES_IN || "1h"),
        tokenType: "Bearer",
      };

      return new ServiceResponse<Token>(
        ResponseStatus.Success,
        "Login successful",
        token,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error logging in: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getUser: async (userId: string): Promise<ServiceResponse<User | null>> => {
    try {
      const user = await userRepository.findByIdAsync(userId);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "User found",
        user,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error getting user1: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
  updateRoleUser: async (
    userId: string,
    roleName: string
  ): Promise<ServiceResponse<User | null>> => {
    try {
      const updatedUser = await userRepository.updateUserRoleAsync(
        userId,
        roleName
      );
      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating role user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<User>(
        ResponseStatus.Success,
        "Role updated successfully",
        updatedUser,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error updating role user: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
