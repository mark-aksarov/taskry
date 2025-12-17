import { Prisma } from "@/generated/prisma/client";

// Position

const positionSummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.PositionSelect;

export type PositionSummaryType = Prisma.PositionGetPayload<{
  select: typeof positionSummarySelect;
}>;
