import z from "zod";

export const subtaskId = z.coerce.number().int().positive();
export const subtaskIsDone = z.boolean();
export const subtaskText = z.string().min(1).max(255);
