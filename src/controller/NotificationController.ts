import { Request, Response } from "express";
import { getAllNotifications, getById } from "../repositories/NotificationRepository";
import { isValidUUID } from "../utils/validateUUID";

export const getNotifications = async (req: Request, res: Response) => {
  const userNotifications = await getAllNotifications();
  if (userNotifications) {
    return res.status(200).json(userNotifications);
  }
  return res.status(200).json([]);
};

export const getNotificationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  const notification = await getById(id);
  if (!notification) return res.status(404).json({ msg: "Notification not found" });
  notification.is_read = true;
  await notification.save();
  return res.status(200).json(notification);
};

export const deleteNotification = async (req: Request, res: Response) => {
  const { id } = req.params;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  const notification = await getById(id);
  if (!notification) {
    return res.status(404).json({ msg: "Notification not found" });
  }
  await notification.remove();
  return res.status(200).json({ msg: "Notification deleted successfully" });
};

export const deleteAllNotifications = async (req: Request, res: Response) => {
  const userNotifications = await getAllNotifications();
  if (userNotifications.length === 0) {
    return res.status(404).json({ msg: "Notifications not found" });
  }
  userNotifications.forEach(async (notification) => {
    await notification.remove();
  });
  return res.status(200).json({ msg: "Notifications deleted successfully" });
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  const { id } = req.params;
  let isValid = isValidUUID(id);
  if (!isValid) return res.status(400).json({ msg: "id is not valid" });
  const notification = await getById(id);
  if (!notification) return res.status(404).json({ msg: "Notification not found" });
  notification.is_read = true;
  await notification.save();
  return res.status(200).json(notification);
};
