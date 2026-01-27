import z from "zod";

export const projectCategorySchema = z.object({
  name: z.string().min(1).max(255),
});
