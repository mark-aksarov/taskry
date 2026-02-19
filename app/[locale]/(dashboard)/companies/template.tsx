import CompaniesTemplate from "./CompaniesTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface CompaniesTemplateProps {
  children: React.ReactNode;
}

export default function AppCompaniesTemplate({
  children,
}: CompaniesTemplateProps) {
  return (
    <CompaniesTemplate {...defaultAppHeaderSlots}>{children}</CompaniesTemplate>
  );
}
