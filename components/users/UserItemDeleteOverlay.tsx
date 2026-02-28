import { ItemBasePendingOverlay } from "../common/ItemBase";
import { useDeleteUserContext } from "./DeleteUserContext";

interface UserItemDeleteOverlayProps {
  children: React.ReactNode;
}

export function UserItemDeleteOverlay({
  children,
}: UserItemDeleteOverlayProps) {
  const { isPending } = useDeleteUserContext();

  return (
    <ItemBasePendingOverlay isPending={isPending}>
      {children}
    </ItemBasePendingOverlay>
  );
}
