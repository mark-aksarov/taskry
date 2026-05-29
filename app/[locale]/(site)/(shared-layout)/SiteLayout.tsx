import { ActionState } from "@/lib/actions/types";
import { AppFooter } from "@/site/layout/AppFooter";
import { AppHeader } from "@/site/layout/AppHeader";

interface SiteLayoutProps {
  isGuest: boolean;
  isEmailVerified: boolean;
  signOut: () => Promise<ActionState>;
  children: React.ReactNode;
}

export function SiteLayout({
  isGuest,
  isEmailVerified,
  signOut,
  children,
}: SiteLayoutProps) {
  return (
    <div className="min-h-dvh">
      <AppHeader
        isGuest={isGuest}
        isEmailVerified={isEmailVerified}
        signOut={signOut}
      />
      {children}
      <AppFooter />
    </div>
  );
}
