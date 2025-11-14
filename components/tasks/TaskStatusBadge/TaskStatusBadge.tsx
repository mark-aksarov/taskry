import { Badge, BadgeColor } from "@/components/ui";
import { twMerge } from "tailwind-merge";

function getStatusBadgeColor(statusId: string): BadgeColor {
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

interface TaskStatusBadgeProps {
  className?: string;
  status: {
    id: string;
    name: string;
  };
}

export function TaskStatusBadge({ className, status }: TaskStatusBadgeProps) {
  return (
    <Badge
      className={twMerge("block w-[5.625rem] truncate px-2", className)}
      color={getStatusBadgeColor(status.id)}
    >
      {status.name}
    </Badge>
  );
}
