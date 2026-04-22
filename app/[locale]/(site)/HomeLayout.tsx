import { AppFooter } from "@/site/layout/AppFooter";
import { AppHeader } from "@/site/layout/AppHeader";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-gray-950">
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
}
