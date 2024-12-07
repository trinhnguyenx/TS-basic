import { Notifications } from "../../model/projects/notifications.entity";
import { notificationRepository } from "./notificationRepository";
import {
  ServiceResponse,
  ResponseStatus,
} from "../../services/serviceResponse.service";
import { StatusCodes } from "http-status-codes";




export const notificationService = {
    async getNotificationByUserId(userId: string): Promise<ServiceResponse<Notifications[] | null>> {
        try {
            const notifications = await notificationRepository.findByUserIdAsync(userId);
            if (!notifications) {
                throw new Error("Notification not found");
            }
            return new ServiceResponse<Notifications[]>(
                ResponseStatus.Success,
                "Notification found successfully",
                notifications,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = `Error getting notification: ${(ex as Error).message}`;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
        
    },
    async updateNotification(userId: string, notificationId: string, data: Notifications): Promise<ServiceResponse<Notifications | null>> {
        try {
            // console.log("data:", data);
            // console.log("userId: ", userId);

            const notification = await notificationRepository.findByIdAsync(notificationId);
    
            const updatedNotification = await notificationRepository.updateNotificationAsync(
                notificationId,
                { ...notification, ...data }
            );
            if (!updatedNotification) {
                throw new Error("Notification not found");
            }
            return new ServiceResponse<Notifications>(
                ResponseStatus.Success,
                "Notification updated successfully",
                updatedNotification,
                StatusCodes.OK
            );
        } catch (ex) {
            const errorMessage = `Error updating notification: ${(ex as Error).message}`;
            return new ServiceResponse(
                ResponseStatus.Failed,
                errorMessage,
                null,
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
};