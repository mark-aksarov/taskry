import CustomersTemplate from "./CustomersTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface AppCustomersTemplateProps {
  children: React.ReactNode;
}

export default async function AppCustomersTemplate({
  children,
}: AppCustomersTemplateProps) {
  return (
    <CustomersTemplate {...defaultAppHeaderSlots}>{children}</CustomersTemplate>
  );
}
