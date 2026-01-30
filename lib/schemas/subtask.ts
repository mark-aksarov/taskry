import z from "zod";
import { coercedPositiveInt } from "./base";

export const subtaskSchema = z.object({
  id: coercedPositiveInt,
  isDone: z.boolean().optional(),
  text: z.string().min(1).max(255),
  taskId: coercedPositiveInt,
});
