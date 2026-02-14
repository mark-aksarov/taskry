import z from "zod";

export const companyId = z.coerce.number().int().positive();
export const companyName = z.string().trim().min(1).max(255);
