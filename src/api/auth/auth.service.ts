import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { Users } from "../../model/users.entity";
import { userRepository } from "../../api/user/userRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse";
import { StatusCodes } from "http-status-codes";
import { generateJwt, verifyJwt } from "../../services/jwtService";
import { Login, Token } from "../auth/auth.interface";
import { calculateUnixTime } from "../../services/caculateDatetime";
import mailService from "../../services/sendEmail";
import { verify } from "crypto";
import { log } from "console";

export const authService = {
  // Register new user
  register: async (userData: Users): Promise<ServiceResponse<Users | null>> => {
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
      console.log("user created");

      const verifyEmail = await authService.verifyEmail(userData.email);

      if (!verifyEmail) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error sending email",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }

      return new ServiceResponse<Users>(
        ResponseStatus.Success,
        "User registered successfully! Please check your email to verify your account",
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
  activateEmail: async (token: string): Promise<ServiceResponse<string|null>> => {
    try {
      const decodedToken = verifyJwt(token);
      if (!decodedToken) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Invalid token",
          null,
          StatusCodes.UNAUTHORIZED
        );
      }
      const email = (decodedToken as any).email;
      const user = await userRepository.findByEmailAsync(email);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.NOT_FOUND
        );
      }
      if (user.isActivated === 1) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Email already activated",
          null,
          StatusCodes.CONFLICT
        );
      }
      const updatedUser = await userRepository.updateUserAsync(user.id, {
        ...user,
        isActivated: 1 ,
      });
      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<string>(
        ResponseStatus.Success,
        "Email activated successfully",
        email,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error activating email: ${(ex as Error).message}`;
      return new ServiceResponse(
        ResponseStatus.Failed,
        errorMessage,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },

  getUser: async (userId: string): Promise<ServiceResponse<Users | null>> => {
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

      return new ServiceResponse<Users>(
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
  ): Promise<ServiceResponse<Users | null>> => {
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

      return new ServiceResponse<Users>(
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
  verifyEmail: async (email: string): Promise<boolean> => {
    try {
      const user = await userRepository.findByEmailAsync(email);
      if (!user) {
        return false;
      }

      const verifyEmailToken = generateJwt({ email });
      console.log("verifyEmailToken generated");
      

      const verifyUrl = `http://localhost:3000/auth/activate?token=${verifyEmailToken}`;
      console.log("verifyUrl generated, start send email");
      const mailIsSent = await mailService.sendEmail({
          emailFrom: "TrelloSGroupProject@gmail.com",
          emailTo: email,
          emailSubject: "Verify email",
          emailText: `Click on the button below to verify your email: <a href="${verifyUrl}">Verify</a>`,
        });

        console.log("mailIsSent", mailIsSent);
     
        if(!mailIsSent){
          return false;
        }

      // return new ServiceResponse<string>(
      //   ResponseStatus.Success,
      //   "Email activated successfully",
      //   email,
      //   StatusCodes.OK
      // );
      return true;
    } catch (ex) {
      const errorMessage = `Error activating email: ${(ex as Error).message}`;
      // return new ServiceResponse(
      //   ResponseStatus.Failed,
      //   errorMessage,
      //   null,
      //   StatusCodes.INTERNAL_SERVER_ERROR
      // );
      return false;
    }}
};
