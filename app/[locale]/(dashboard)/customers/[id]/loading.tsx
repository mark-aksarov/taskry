import CustomerDetailLoading from "./CustomerDetailLoading";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

export default function AppCustomerDetailLoading() {
  return <CustomerDetailLoading appHeaderProps={defaultAppHeaderSlots} />;
}
