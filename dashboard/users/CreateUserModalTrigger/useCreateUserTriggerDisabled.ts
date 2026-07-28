import { useCreateUser } from "@/dashboard/users/CreateUserContext";

export function useCreateUserTriggerDisabled() {
  // Create task action and modal states
  const { isPending: isCreateUserPending } = useCreateUser();

  return isCreateUserPending;
}
