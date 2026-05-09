import { ActionState } from "@/lib/actions/types";
import { AppFooter } from "@/site/layout/AppFooter";
import { AppHeader } from "@/site/layout/AppHeader";

interface SiteLayoutProps {
  isGuest: boolean;
  signOut: () => Promise<ActionState>;
  children: React.ReactNode;
}

export function SiteLayout({ isGuest, signOut, children }: SiteLayoutProps) {
  return (
    <div className="min-h-dvh">
      <AppHeader isGuest={isGuest} signOut={signOut} />
      {children}
      <AppFooter />
    </div>
  );
}
