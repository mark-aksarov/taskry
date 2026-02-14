import z from "zod";

export const projectCategoryId = z.coerce.number().int().positive();
export const projectCategoryName = z.string().trim().min(1).max(255);
