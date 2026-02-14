import z from "zod";

export const taskCategoryId = z.coerce.number().int().positive();
export const taskCategoryName = z.string().trim().min(1).max(255);
