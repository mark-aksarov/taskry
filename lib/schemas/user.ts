import z from "zod";
import { coercedPositiveInt } from "./base";

export const userSchema = z.object({
  id: z.string().min(1).max(255),
  fullName: z.string().min(1).max(255),
  bio: z.string().max(5000).optional(),
  address: z.string().max(255).optional(),
  birthdate: z.coerce.date("yyyy-MM-dd").optional(),
  email: z.email().min(1).max(254),
  password: z.string().min(8).max(128),
  phoneNumber: z.string().min(1).max(255).optional(),
  publicLink: z.string().min(1).max(255).optional(),
  positionId: coercedPositiveInt.optional(),
});
