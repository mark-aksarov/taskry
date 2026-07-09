import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";

export interface UserGridProps {
  children: React.ReactNode;
}

export function UserGrid({ children }: UserGridProps) {
  const { viewMode } = useViewMode();

  return <EntityGrid viewMode={viewMode}>{children}</EntityGrid>;
}
