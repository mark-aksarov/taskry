import z from "zod";
import { coercedPositiveInt } from "./base";

export const customerSchema = z.object({
  id: coercedPositiveInt,
  fullName: z.string().min(1).max(255),
  bio: z.string().max(5000).optional(),
  email: z.email().min(1).max(254),
  phoneNumber: z.string().min(1).max(255).optional(),
  publicLink: z.string().min(1).max(255).optional(),
  companyId: coercedPositiveInt,
});
