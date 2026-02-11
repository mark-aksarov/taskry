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
    emptyStringToNull,
    z.string().trim().min(1).max(5000).nullable(),
  ),
  address: z.preprocess(
    emptyStringToNull,
    z.string().trim().min(1).max(255).nullable(),
  ),
  birthdate: z.preprocess(
    emptyStringToNull,
    z.coerce.date("yyyy-MM-dd").nullable(),
  ),
  email: z.email().max(254),
  password: z.string().min(8).max(128),
  phoneNumber: z.preprocess(
    emptyStringToNull,
    z.string().trim().min(1).max(255).nullable(),
  ),
  publicLink: z.preprocess(
    emptyStringToNull,
    z.string().trim().min(1).max(255).nullable(),
  ),
  positionId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
});
