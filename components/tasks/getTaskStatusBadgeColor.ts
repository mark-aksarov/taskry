import { BadgeColor } from "@/components/ui";
import { TaskStatus } from "@/generated/prisma/enums";

export function getTaskStatusBadgeColor(status: TaskStatus): BadgeColor {
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
