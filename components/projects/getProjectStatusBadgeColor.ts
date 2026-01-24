import { BadgeColor } from "@/components/ui/Badge";
import { ProjectStatus } from "@/generated/prisma/enums";

export function getProjectStatusBadgeColor(status: ProjectStatus): BadgeColor {
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
