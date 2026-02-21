import z from "zod";
import { ProjectStatus } from "@/generated/prisma/enums";

export const projectId = z.coerce.number().int().positive();
export const projectTitle = z.string().trim().min(1).max(255);
export const projectDescription = z.string().trim().min(1).max(5000);
export const projectDeadline = z.iso.date();
export const projectStatus = z.enum(ProjectStatus);
