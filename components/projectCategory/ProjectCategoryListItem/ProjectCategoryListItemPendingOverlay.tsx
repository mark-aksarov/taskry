import { ItemBasePendingOverlay } from "@/components/common/ItemBase";
import { useProjectCategoryListItemPending } from "./useProjectCategoryListItemPending";

interface ProjectCategoryListItemPendingOverlayProps {
  projectCategoryId: number;
  children: React.ReactNode;
}

export function ProjectCategoryListItemPendingOverlay({
  projectCategoryId,
  children,
}: ProjectCategoryListItemPendingOverlayProps) {
  const isPending = useProjectCategoryListItemPending(projectCategoryId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
