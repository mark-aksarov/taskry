import z from "zod";
import { coercedPositiveInt } from "./base";
import { ProjectStatus } from "@/generated/prisma/enums";

export const projectStatusParam = z.enum(ProjectStatus);

export const projectSchema = z.object({
  id: coercedPositiveInt,
  title: z.string().min(1).max(255),
  description: z.string().max(5000).optional(),
  deadline: z.coerce.date("yyyy-MM-dd"),
  status: projectStatusParam,
  categoryId: coercedPositiveInt,
  customerId: coercedPositiveInt.optional(),
});
