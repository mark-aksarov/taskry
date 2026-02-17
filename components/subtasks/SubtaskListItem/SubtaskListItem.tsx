import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface SubtaskListItemProps {
  isDone: boolean;
  actionMenuTrigger: React.ReactNode;
}

export function SubtaskListItem({
  isDone,
  actionMenuTrigger,
}: SubtaskListItemProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-2">
        <Check
          size={16}
          className={twMerge(
            "mt-0.5 shrink-0",
            isDone && "text-blue-600 dark:text-blue-700",
            !isDone && "text-gray-500 dark:text-gray-400",
          )}
        />
        {actionMenuTrigger}
      </div>
    </div>
  );
}
