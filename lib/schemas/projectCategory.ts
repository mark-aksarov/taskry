import z from "zod";
import { emptyStringToUndefined } from "./base";

export const projectCategorySchema = z.object({
  name: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).max(255)),
});
