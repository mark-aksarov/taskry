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

interface ProjectStatusBadgeProps {
  className?: string;
  status: {
    id: string;
    name: string;
  };
}

export function ProjectStatusBadge({
  className,
  status,
}: ProjectStatusBadgeProps) {
  return (
    <Badge
      className={twMerge("w-[5.625rem]", className)}
      color={getStatusBadgeColor(status.id)}
    >
      {status.name}
    </Badge>
  );
}
