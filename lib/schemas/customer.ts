import z from "zod";

export const customerId = z.coerce.number().int().positive();
export const customerFullName = z.string().trim().min(1).max(255);
export const customerBio = z.string().trim().min(1).max(5000);
export const customerEmail = z.email().max(254);
export const customerPhoneNumber = z.string().trim().min(1).max(20);
export const customerPublicLink = z.string().trim().min(1).max(255);
