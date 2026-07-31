import { BadgeColor } from "@/ui/Badge";
import { TaskStatus } from "@/generated/prisma/enums";

export function getTaskStatusBadgeColor(
  status: TaskStatus,
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
