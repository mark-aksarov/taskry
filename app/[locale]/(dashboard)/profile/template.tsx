import ProfileTemplate from "./ProfileTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface AppProfileTemplateProps {
  children: React.ReactNode;
}

export default async function AppProfileTemplate({
  children,
}: AppProfileTemplateProps) {
  return (
    <ProfileTemplate {...defaultAppHeaderSlots}>{children}</ProfileTemplate>
  );
}
