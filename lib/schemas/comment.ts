import z from "zod";

export const commentId = z.coerce.number().int().positive();
export const commentContent = z.string().min(1).max(1000);
