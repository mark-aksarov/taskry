import { Button } from "@/components/ui";
import { MessagesSquare } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function TaskDetailCommentModalTrigger({
  className,
}: {
  className?: string;
}) {
  return (
    <Button
      variant="outlined"
      label={24}
      className="rounded-lg"
      iconLeft={
        <MessagesSquare size={16} strokeWidth={1.5} absoluteStrokeWidth />
      }
    />
  );
}
