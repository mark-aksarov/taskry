import { ChevronRight } from "lucide-react";

interface SearchListItemContentProps {
  children: React.ReactNode;
}

export function SearchListItemContent({
  children,
}: SearchListItemContentProps) {
  return (
    <>
      <div className="text-sm font-semibold text-(--text-primary)">
        {children}
      </div>
      <ChevronRight
        size={16}
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="text-(--text-primary)"
      />
    </>
  );
}
