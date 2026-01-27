import z from "zod";
import { coercedPositiveInt } from "./base";

export const commentSchema = z.object({
  id: coercedPositiveInt,
  content: z.string().min(1).max(1000),
  taskId: z.preprocess(
    (val) => (!val ? undefined : val),
    coercedPositiveInt.optional(),
  ),
  projectId: z.preprocess(
    (val) => (!val ? undefined : val),
    coercedPositiveInt.optional(),
  ),
});
