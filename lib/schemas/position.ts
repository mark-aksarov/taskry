import z from "zod";
import { coercedPositiveInt, emptyStringToUndefined } from "./base";

export const positionSchema = z.object({
  id: coercedPositiveInt,
  name: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).max(255)),
});
