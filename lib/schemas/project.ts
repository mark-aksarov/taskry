import z from "zod";
import { clientId } from "./client";
import { emptyStringToUndefined } from "./base";
import { projectCategoryId } from "./projectCategory";
import { ProjectStatus } from "@/generated/prisma/enums";

export const projectId = z.coerce.number().int().positive();
export const projectTitle = z.string().trim().min(1).max(255);
export const projectDescription = z.string().trim().min(1).max(5000);
export const projectDeadline = z.iso.date();
export const projectStatus = z.enum(ProjectStatus);

export const createProjectSchema = z.object({
  title: projectTitle,
  description: z.preprocess(
    emptyStringToUndefined,
    projectDescription.optional(),
  ),
  deadline: projectDeadline,
  status: projectStatus,
  categoryId: z.preprocess(
    emptyStringToUndefined,
    projectCategoryId.optional(),
  ),
  clientId: z.preprocess(emptyStringToUndefined, clientId.optional()),
});
