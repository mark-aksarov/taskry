import { BadgeColor } from "@/components/ui";

export function getTaskStatusBadgeColor(status: string): BadgeColor {
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
