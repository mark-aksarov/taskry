import z from "zod";
import { emptyStringToUndefined } from "./base";
import { companyId } from "./company";

export const clientId = z.coerce.number().int().positive();
export const clientFullName = z.string().trim().min(1).max(255);
export const clientBio = z.string().trim().min(1).max(5000);
export const clientEmail = z.email({ pattern: z.regexes.html5Email }).max(254);
export const clientPhoneNumber = z.string().trim().min(1).max(20);
export const clientPublicLink = z.string().trim().min(1).max(255);
export const clientImageUrl = z.url();

export const createClientSchema = z.object({
  fullName: clientFullName,
  bio: z.preprocess(emptyStringToUndefined, clientBio.optional()),
  email: clientEmail,
  phoneNumber: z.preprocess(
    emptyStringToUndefined,
    clientPhoneNumber.optional(),
  ),
  publicLink: z.preprocess(emptyStringToUndefined, clientPublicLink.optional()),
  companyId: z.preprocess(emptyStringToUndefined, companyId.optional()),
});
