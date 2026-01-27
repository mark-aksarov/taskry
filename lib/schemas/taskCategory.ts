import z from "zod";

export const taskCategorySchema = z.object({
  name: z.string().min(1).max(255),
});
