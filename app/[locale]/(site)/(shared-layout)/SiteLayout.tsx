import { ActionState } from "@/lib/actions/types";
import { AppFooter } from "@/site/layout/AppFooter";
import { AppHeader } from "@/site/layout/AppHeader";

interface SiteLayoutProps {
  signOut: () => Promise<ActionState>;
  children: React.ReactNode;
}

export function SiteLayout({ signOut, children }: SiteLayoutProps) {
  return (
    <div className="min-h-dvh">
      <AppHeader signOut={signOut} />
      {children}
      <AppFooter />
    </div>
  );
}
