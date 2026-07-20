import z from "zod";
import { userId } from "./user";
import { projectId } from "./project";
import { emptyStringToUndefined } from "./base";
import { taskCategoryId } from "./taskCategory";
import { TaskStatus } from "@/generated/prisma/enums";

export const taskId = z.coerce.number().int().positive();
export const taskTitle = z.string().trim().min(1).max(255);
export const taskDescription = z.string().trim().min(1).max(5000);
export const taskDeadline = z.iso.date();
export const taskStatus = z.enum(TaskStatus);

export const createTaskSchema = z.object({
  title: taskTitle,
  description: z.preprocess(emptyStringToUndefined, taskDescription.optional()),
  deadline: taskDeadline,
  status: taskStatus,
  projectId: z.preprocess(emptyStringToUndefined, projectId.optional()),
  categoryId: z.preprocess(emptyStringToUndefined, taskCategoryId.optional()),
  assigneeId: z.preprocess(emptyStringToUndefined, userId.optional()),
});
