import { BadgeColor } from "@/components/ui";

export function getProjectStatusBadgeColor(statusId: string): BadgeColor {
  switch (statusId) {
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
