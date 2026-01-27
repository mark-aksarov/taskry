import z from "zod";
import { coercedPositiveInt } from "./base";
import { TaskStatus } from "@/generated/prisma/enums";

export const taskStatusParam = z.enum(TaskStatus);

export const taskSchema = z.object({
  id: coercedPositiveInt,
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date("yyyy-MM-dd"),
  status: taskStatusParam,
  categoryId: coercedPositiveInt,
  projectId: coercedPositiveInt,
  assigneeId: z.coerce.string().optional(),
});
