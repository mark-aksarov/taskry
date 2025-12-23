import { Prisma } from "@/generated/prisma/client";

// CompanySummary

export const companySummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.CompanySelect;

export type CompanySummaryType = Prisma.CompanyGetPayload<{
  select: typeof companySummarySelect;
}>;
