import { BadgeColor } from "@/ui/Badge";
import { TaskStatus } from "@/generated/prisma/enums";

export function getTaskStatusBadgeColor(
  status: TaskStatus,
  deadline: string,
): BadgeColor {
  const isOverdue =
    new Date(deadline) < new Date() && status !== TaskStatus.completed;

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
