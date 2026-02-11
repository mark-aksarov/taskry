import {
  emptyStringToNull,
  coercedPositiveInt,
  emptyStringToUndefined,
} from "./base";

import z from "zod";

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
  email: z.email().max(254),
  phoneNumber: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(20).optional(),
  ),
  publicLink: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255).optional(),
  ),
  companyId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
});
