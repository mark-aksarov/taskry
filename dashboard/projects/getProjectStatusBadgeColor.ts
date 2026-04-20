import { BadgeColor } from "@/ui/Badge";
import { ProjectStatus } from "@/generated/prisma/enums";

export function getProjectStatusBadgeColor(
  status: ProjectStatus,
  deadline: string,
): BadgeColor {
  const isOverdue =
    new Date(deadline) < new Date() && status !== ProjectStatus.completed;

  if (isOverdue) return "red";

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
