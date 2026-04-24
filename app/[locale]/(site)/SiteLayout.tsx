import { AppFooter } from "@/site/layout/AppFooter";
import { AppHeader } from "@/site/layout/AppHeader";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
