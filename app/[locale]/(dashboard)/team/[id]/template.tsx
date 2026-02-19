import ProfileTemplate from "./TeamProfileTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface ProfileTemplateProps {
  children: React.ReactNode;
}

export default async function AppProfileTemplate({
  children,
}: ProfileTemplateProps) {
  return (
    <ProfileTemplate {...defaultAppHeaderSlots}>{children}</ProfileTemplate>
  );
}
