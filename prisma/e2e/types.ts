import { Prisma } from "@/generated/prisma/client";

export interface E2ESeedPayload {
  companies?: Prisma.CompanyCreateManyInput[];
  customers?: Prisma.CustomerCreateManyInput[];
  projectCategories?: Prisma.ProjectCategoryCreateManyInput[];
  projects?: Prisma.ProjectCreateManyInput[];
  taskCategories?: Prisma.TaskCategoryCreateManyInput[];
  tasks?: Prisma.TaskCreateManyInput[];
  notifications?: Prisma.NotificationCreateManyInput[];
  comments?: Prisma.CommentCreateManyInput[];
}
