import z from "zod";

export const positionId = z.coerce.number().int().positive();
export const positionName = z.string().trim().min(1).max(255);
