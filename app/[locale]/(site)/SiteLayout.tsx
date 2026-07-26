import { AppFooter } from "@/site/layout/AppFooter";
import { AppHeader } from "@/site/layout/AppHeader";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
