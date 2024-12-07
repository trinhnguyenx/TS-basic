import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { notificationService } from "./notification.service";
import { Users } from "../../model/users.entity";
import { ResponseStatus } from "../../services/serviceResponse.service";
import { Profile, decoded } from "../user/user.interface";
import { Notifications } from "../../model/projects/notifications.entity";
import { AuthenticatedRequest } from "../auth/auth.interface";
import { handleServiceResponse } from "../../services/httpHandlerResponse.service";


export const NotificationController = {
 async getNotificationByUserId(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = (req.user as decoded).userId;
      const serviceResponse = await notificationService.getNotificationByUserId(userId);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error getting notification: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         status: ResponseStatus.Failed,
         message: errorMessage,
         data: null,
      });
    }
 },
 async updateNotification(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = (req.user as decoded).userId;
      const notificationId = req.params.notificationId;
      const data = req.body;
      const serviceResponse = await notificationService.updateNotification(userId, notificationId, data);
      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      const errorMessage = `Error updating notification: ${(error as Error).message}`;
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
         status: ResponseStatus.Failed,
         message: errorMessage,
         data: null,
      });
    }
 }
}