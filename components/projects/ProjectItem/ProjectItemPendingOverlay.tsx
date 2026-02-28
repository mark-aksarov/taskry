import { ItemBasePendingOverlay } from "../../common/ItemBase";
import { useProjectItemPending } from "./useProjectItemPending";

interface ProjectItemPendingOverlayProps {
  projectId: number;
  children: React.ReactNode;
}

export function ProjectItemPendingOverlay({
  projectId,
  children,
}: ProjectItemPendingOverlayProps) {
  const isPending = useProjectItemPending(projectId);

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
