import { Prisma } from "@/generated/prisma/client";

export interface E2ESeedPayload {
  workspaces?: Prisma.WorkspaceCreateManyInput[];
  companies?: Prisma.CompanyCreateManyInput[];
  customers?: Prisma.CustomerCreateManyInput[];
  projectCategories?: Prisma.ProjectCategoryCreateManyInput[];
  projects?: Prisma.ProjectCreateManyInput[];
  taskCategories?: Prisma.TaskCategoryCreateManyInput[];
  tasks?: Prisma.TaskCreateManyInput[];
  users?: Prisma.UserCreateManyInput[];
  accounts?: Prisma.AccountCreateManyInput[];
  positions?: Prisma.PositionCreateManyInput[];
  comments?: Prisma.CommentCreateManyInput[];
  searchKeywords?: Prisma.SearchKeywordCreateManyInput[];
}
