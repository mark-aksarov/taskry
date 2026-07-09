import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";

interface CustomerGrid {
  children: React.ReactNode;
}

export function CustomerGrid({ children }: CustomerGrid) {
  const { viewMode } = useViewMode();

  return <EntityGrid viewMode={viewMode}>{children}</EntityGrid>;
}
