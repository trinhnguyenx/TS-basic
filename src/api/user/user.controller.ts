import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse";
import { Profile} from "./user.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse";

export const UserController ={
    async updateProfile(req: Request, res: Response) {
       const profileData: Profile = req.body;
       try {
         const serviceResponse = await userService.updateProfile(profileData);
         
         handleServiceResponse(serviceResponse, res);
       } catch (error) {
         const errorMessage = `Error update user profile: ${
           (error as Error).message
         }`;
         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
           status: ResponseStatus.Failed,
           message: errorMessage,
           data: null,
         });
       }

    }

}