import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";

interface ClientGrid {
  children: React.ReactNode;
}

export function ClientGrid({ children }: ClientGrid) {
  const { viewMode } = useViewMode();

  return <EntityGrid viewMode={viewMode}>{children}</EntityGrid>;
}
