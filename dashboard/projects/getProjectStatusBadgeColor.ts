import { BadgeColor } from "@/ui/Badge";
import { ProjectStatus } from "@/generated/prisma/enums";

export function getProjectStatusBadgeColor(
  status: ProjectStatus,
  overdue: boolean,
): BadgeColor {
  if (overdue) return "red";

  switch (status) {
    case "pending":
      return "orange";
    case "active":
      return "green";
    case "completed":
      return "blue";
    default:
      throw new Error("Unknown status id");
  }
}
