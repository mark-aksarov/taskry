import { Prisma } from "@/generated/prisma/client";

export const projectCategorySummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.ProjectCategorySelect;

export type ProjectCategorySummaryType = Prisma.ProjectCategoryGetPayload<{
  select: typeof projectCategorySummarySelect;
}>;
