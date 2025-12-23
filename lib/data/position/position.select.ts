import { Prisma } from "@/generated/prisma/client";

// Position

export const positionSummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.PositionSelect;

export type PositionSummaryType = Prisma.PositionGetPayload<{
  select: typeof positionSummarySelect;
}>;
