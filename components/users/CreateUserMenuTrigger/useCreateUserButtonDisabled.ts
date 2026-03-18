import { useCreateUser } from "../CreateUserContext";
import { useCreatePosition } from "@/components/position/CreatePositionContext";

export function useCreateUserButtonDisabled() {
  // Block user interactions while a position or user is being created
  const { isPending: isCreatePositionPending } = useCreatePosition();
  const { isPending: isCreateUserPending } = useCreateUser();

  return isCreateUserPending || isCreatePositionPending;
}
