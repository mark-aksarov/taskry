import { Loader2 } from "lucide-react";

export function StatusLoader() {
  return (
    <Loader2
      data-testid="loader-icon"
      size={16}
      strokeWidth={1.5}
      absoluteStrokeWidth
      className="animate-spin text-(--text-disabled)"
    />
  );
}
