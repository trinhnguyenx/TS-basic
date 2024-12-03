import bcrypt from "bcryptjs";
import { Int32 } from "typeorm";
import { Users } from "../../model/users.entity";
import { userRepository } from "../../api/user/userRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";

import cacheService from "../../services/cache.service";
// import { cache } from "../../services/cacheService";
import { generateJwt, verifyJwt } from "../../services/jwt.service";
import { Profile, Token } from "../user/user.interface";
import { calculateUnixTime } from "../../services/caculateDatetime.service";
import mailService from "../../services/sendEmail.service";
import { profile } from "console";

export const userService = {
  async updateProfile(
    profileData: Profile
  ): Promise<ServiceResponse<Profile | Users | null>> {
    try {
      console.log("profileData:", profileData);
      /*profileData: { name: 'huy01', bio: 'this is bio 01', avatarUrl: 'url01' } */
      const user = await userRepository.findByIdAsync(profileData.userId);
      if (!user) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "User not found",
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      // console.log("user at service:", user);
      /*user: {
  createdAt: 2024-11-16T13:25:55.439Z,
  updatedAt: 2024-11-16T13:25:55.439Z,
  id: '1887d709-daf5-4082-b72d-9f6b9fd913e3',
  name: 'user03',
  password: '$2a$10$0eP6jYY0Ao9Wt849dIcSqu7WQi0A4uFukfPdCzwihz6Z6p5OZuN9K',
  email: 'nguyenduchuy2005hnh@gmail.com',
  bio: null,
  isActivated: 1,
  avatarUrl: null,
  accessToken: null,
  accessTokenExpiresAt: null,
  resetToken: null,
  resetTokenExpiresAt: null
} */
      // const updateUser = {...user, ...profileData};
      // console.log("user:", {...user,...profileData});
      const userToUpdate: Users = {
        ...user,
        // ...profileData,
        name: profileData.name || user.name,
        bio: profileData.bio || user.bio,
        avatarUrl: profileData.avatarUrl || user.avatarUrl,
      };

      // console.log("userToUpdate:", userToUpdate);

      const updatedUser = await userRepository.updateUserAsync(
        user.id,
        userToUpdate
      );
      // console.log("updatedUser:", updatedUser);

      if (!updatedUser) {
        return new ServiceResponse(
          ResponseStatus.Failed,
          "Error updating user",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        );
      }
      return new ServiceResponse<Profile>(
        ResponseStatus.Success,
        "User updated",
        profileData,
        StatusCodes.OK
      );
    } catch (error) {
      return new ServiceResponse(
        ResponseStatus.Failed,
        (error as Error).message,
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  },
};
