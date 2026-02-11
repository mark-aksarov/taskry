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
    emptyStringToNull,
    z.string().trim().min(1).max(5000).nullable(),
  ),
  email: z.email().max(254),
  phoneNumber: z.preprocess(
    emptyStringToNull,
    z.string().trim().min(1).max(20).nullable(),
  ),
  publicLink: z.preprocess(
    emptyStringToNull,
    z.string().trim().min(1).max(255).nullable(),
  ),
  companyId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
});
