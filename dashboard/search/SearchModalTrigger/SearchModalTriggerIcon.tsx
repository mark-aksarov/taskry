import { Search } from "lucide-react";

export function SearchModalTriggerIcon() {
  return (
    <div className="p-2">
      <Search
        size={18}
        strokeWidth={1.5}
        absoluteStrokeWidth
        className="text-(--text-primary)"
      />
    </div>
  );
}
