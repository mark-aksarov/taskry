import { Badge, BadgeColor } from "@/components/ui";
import { twMerge } from "tailwind-merge";

function getStatusBadgeColor(statusId: number): BadgeColor {
  switch (statusId) {
    case 1:
      return "orange";
    case 2:
      return "green";
    case 3:
      return "blue";
    default:
      throw new Error("Unknown status id");
  }
}

interface ProjectStatusBadgeProps {
  className?: string;
  status: {
    id: number;
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
