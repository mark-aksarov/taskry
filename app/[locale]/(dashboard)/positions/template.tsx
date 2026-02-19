import PositionsTemplate from "./PositionsTemplate";
import { defaultAppHeaderSlots } from "@/components/layout/AppHeader/defaultAppHeaderSlots";

interface AppPositionsTemplateProps {
  children: React.ReactNode;
}

export default async function AppPositionsTemplate({
  children,
}: AppPositionsTemplateProps) {
  return (
    <PositionsTemplate {...defaultAppHeaderSlots}>{children}</PositionsTemplate>
  );
}
