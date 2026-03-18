import { ActionFn, ActionState, DeleteUserPayload } from "@/lib/actions/types";

export interface BaseUserItemProps {
  id: string;
  fullName: string;
  imageUrl?: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  position?: {
    name: string;
  };
  editUserFormContainer: React.ReactNode;
  updateUser: ActionFn<ActionState, FormData>;
  deleteUser: ActionFn<ActionState, DeleteUserPayload>;
}
