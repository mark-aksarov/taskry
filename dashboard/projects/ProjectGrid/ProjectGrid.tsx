import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { useViewMode } from "@/dashboard/common/ViewMode";

export interface ProjectGridProps {
  children: React.ReactNode;
}

export function ProjectGrid({ children }: ProjectGridProps) {
  const { viewMode } = useViewMode();

  return <EntityGrid viewMode={viewMode}>{children}</EntityGrid>;
}
