import SharedLayout from "./SharedLayout";
import { ProfileLinkContainer } from "@/dashboard/layout/ProfileLinkContainer";

interface AppSharedLayoutProps {
  children: React.ReactNode;
}

export default function AppSharedLayout({ children }: AppSharedLayoutProps) {
  return (
    <SharedLayout profileLinkContainer={<ProfileLinkContainer />}>
      {children}
    </SharedLayout>
  );
}
