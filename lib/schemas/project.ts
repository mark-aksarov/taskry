import {
  emptyStringToNull,
  coercedPositiveInt,
  emptyStringToUndefined,
} from "./base";

import z from "zod";
import { ProjectStatus } from "@/generated/prisma/enums";

export const projectSchema = z.object({
  id: coercedPositiveInt,
  title: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(255),
  ),
  description: z.preprocess(
    emptyStringToUndefined,
    z.string().trim().min(1).max(5000).optional(),
  ),
  deadline: z.coerce.date("yyyy-MM-dd"),
  status: z.enum(ProjectStatus),
  categoryId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
  customerId: z.preprocess(emptyStringToNull, coercedPositiveInt.nullable()),
});
