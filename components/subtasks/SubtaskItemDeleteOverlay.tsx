import { ItemBasePendingOverlay } from "../common/ItemBase";
import { useDeleteSubtaskContext } from "./DeleteSubtaskContext";

interface SubtaskItemDeleteOverlayProps {
  children: React.ReactNode;
}

export function SubtaskItemDeleteOverlay({
  children,
}: SubtaskItemDeleteOverlayProps) {
  const { isPending } = useDeleteSubtaskContext();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
