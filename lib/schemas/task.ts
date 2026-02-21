import z from "zod";
import { TaskStatus } from "@/generated/prisma/enums";

export const taskId = z.coerce.number().int().positive();
export const taskTitle = z.string().trim().min(1).max(255);
export const taskDescription = z.string().trim().min(1).max(5000);
export const taskDeadline = z.iso.date();
export const taskStatus = z.enum(TaskStatus);
