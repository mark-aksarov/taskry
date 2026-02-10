import {
  emptyStringToNull,
  coercedPositiveInt,
  emptyStringToUndefined,
} from "./base";

import z from "zod";
import { TaskStatus } from "@/generated/prisma/enums";

export const taskSchema = z.object({
  id: coercedPositiveInt,
  title: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255),
  ),
  description: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(5000).optional(),
  ),
  deadline: z.coerce.date("yyyy-MM-dd"),
  status: z.enum(TaskStatus),
  categoryId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
  projectId: coercedPositiveInt,
  assigneeId: z.preprocess(
    emptyStringToNull,
    z.coerce.string().min(1).nullable(),
  ),
});
