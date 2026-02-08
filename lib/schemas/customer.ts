import z from "zod";
import { coercedPositiveInt, emptyStringToUndefined } from "./base";

export const customerSchema = z.object({
  id: coercedPositiveInt,
  fullName: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255),
  ),
  bio: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(5000).optional(),
  ),
  email: z.email().min(1).max(254),
  phoneNumber: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(20).optional(),
  ),
  publicLink: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255).optional(),
  ),
  companyId: z.preprocess(
    (val) => (val === "" ? undefined : val),
    coercedPositiveInt.optional(),
  ),
});
