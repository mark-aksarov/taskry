import { Check } from "lucide-react";

interface DemoDataSummaryItemProps {
  title: string;
  description: string;
}

export function DemoDataSummaryItem({
  title,
  description,
}: DemoDataSummaryItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span className="flex items-center justify-center rounded-full bg-(--accent) p-[3px]">
        <Check size={12} className="text-white" />
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-(--text-primary)">{title}</span>
        <span className="text-sm text-(--text-secondary)">{description}</span>
      </div>
    </li>
  );
}
