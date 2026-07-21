import z from "zod";
import { emptyStringToUndefined } from "./base";
import { companyId } from "./company";

export const customerId = z.coerce.number().int().positive();
export const customerFullName = z.string().trim().min(1).max(255);
export const customerBio = z.string().trim().min(1).max(5000);
export const customerEmail = z
  .email({ pattern: z.regexes.html5Email })
  .max(254);
export const customerPhoneNumber = z.string().trim().min(1).max(20);
export const customerPublicLink = z.string().trim().min(1).max(255);
export const customerImageUrl = z.url();

export const createCustomerSchema = z.object({
  fullName: customerFullName,
  bio: z.preprocess(emptyStringToUndefined, customerBio.optional()),
  email: customerEmail,
  phoneNumber: z.preprocess(
    emptyStringToUndefined,
    customerPhoneNumber.optional(),
  ),
  publicLink: z.preprocess(
    emptyStringToUndefined,
    customerPublicLink.optional(),
  ),
  imageUrl: z.preprocess(emptyStringToUndefined, customerImageUrl.optional()),
  companyId: z.preprocess(emptyStringToUndefined, companyId.optional()),
});
