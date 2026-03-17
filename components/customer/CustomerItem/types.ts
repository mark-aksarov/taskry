import {
  ActionFn,
  ActionState,
  DeleteCustomerPayload,
} from "@/lib/actions/types";

export interface BaseCustomerItemProps {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  imageUrl?: string;
  company?: {
    id: number;
    name: string;
  };
  editCustomerFormContainer: React.ReactNode;
  updateCustomer: ActionFn<ActionState, FormData>;
  deleteCustomer: ActionFn<ActionState, DeleteCustomerPayload>;
}
