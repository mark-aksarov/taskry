import { ChevronRight } from "lucide-react";

interface SearchListItemContentProps {
  children: React.ReactNode;
}

export function SearchListItemContent({
  children,
}: SearchListItemContentProps) {
  return (
    <>
      <div className="truncate text-sm font-semibold text-(--text-primary)">
        {children}
      </div>
      <ChevronRight
        
        
        
        className="shrink-0 text-(--text-primary)"
      />
    </>
  );
}
