import {
  emptyStringToNull,
  coercedPositiveInt,
  emptyStringToUndefined,
} from "./base";

import z from "zod";

export const userSchema = z.object({
  id: z.string().min(1).max(255),
  fullName: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255),
  ),
  bio: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(5000).optional(),
  ),
  address: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255).optional(),
  ),
  birthdate: z.coerce.date("yyyy-MM-dd").optional(),
  email: z.email().max(254),
  password: z.string().min(8).max(128),
  phoneNumber: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255).optional(),
  ),
  publicLink: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255).optional(),
  ),
  positionId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
});
