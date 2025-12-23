import { Prisma } from "@/generated/prisma/client";

export const taskCategorySummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.TaskCategorySelect;

export type TaskCategorySummaryType = Prisma.TaskCategoryGetPayload<{
  select: typeof taskCategorySummarySelect;
}>;
