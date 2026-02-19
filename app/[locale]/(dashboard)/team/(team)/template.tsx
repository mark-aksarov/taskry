import UsersTemplate from "./UsersTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface UsersTemplateProps {
  children: React.ReactNode;
}

export default async function AppUsersTemplate({
  children,
}: UsersTemplateProps) {
  return <UsersTemplate {...defaultAppHeaderSlots}>{children}</UsersTemplate>;
}
