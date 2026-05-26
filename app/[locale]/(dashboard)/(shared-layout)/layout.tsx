import SharedLayout from "./SharedLayout";
import { signOut } from "@/lib/actions/auth/signOut";
import { ProfileLinkContainer } from "@/dashboard/layout/ProfileLinkContainer";

interface AppSharedLayoutProps {
  children: React.ReactNode;
}

export default function AppSharedLayout({ children }: AppSharedLayoutProps) {
  return (
    <SharedLayout
      signOut={signOut}
      profileLinkContainer={<ProfileLinkContainer />}
    >
      {children}
    </SharedLayout>
  );
}
