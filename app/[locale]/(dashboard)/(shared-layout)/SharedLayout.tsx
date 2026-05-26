"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { AppHeader } from "@/dashboard/layout/AppHeader";
import { useParams, useSearchParams } from "next/navigation";
import { GuestModeModal } from "@/dashboard/common/GuestModeModal";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { SearchBarProvider } from "@/dashboard/search/SearchBar/index";
import { PageTransitionProvider } from "@/dashboard/common/PageTransitionContext";

interface SharedLayoutProps {
  profileLinkContainer: React.ReactNode;
  children: React.ReactNode;
  signOut: () => Promise<ActionState>;
}

// The shared layout is a client component, but the layout itself is a server component that passes the page as a slot.
export default function SharedLayout({
  profileLinkContainer,
  children,
  signOut,
}: SharedLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  /** Route configuration */
  const routeConfig = [
    {
      match: pathname === "/customers",
      namespace: "app.CustomersPage",
    },
    {
      match: pathname.startsWith("/customers") && params.id,
      namespace: "app.CustomerDetailPage",
      backButtonHref: "/customers",
    },
    {
      match: pathname === "/companies",
      namespace: "app.CompaniesPage",
      backButtonHref: "/customers",
    },
    {
      match: pathname === "/projects",
      namespace: "app.ProjectsPage",
    },
    {
      match: pathname.startsWith("/projects") && params.id,
      namespace: "app.ProjectDetailPage",
      backButtonHref: "/projects",
    },
    {
      match: pathname === "/project-categories",
      namespace: "app.ProjectCategoriesPage",
      backButtonHref: "/projects",
    },
    {
      match: pathname === "/tasks",
      namespace: "app.TasksPage",
    },
    {
      match: pathname.startsWith("/tasks") && params.id,
      namespace: "app.TaskDetailPage",
      backButtonHref: "/tasks",
    },
    {
      match: pathname === "/task-categories",
      namespace: "app.TaskCategoriesPage",
      backButtonHref: "/tasks",
    },
    {
      match: pathname === "/team",
      namespace: "app.TeamPage",
    },
    {
      match: pathname.startsWith("/team") && params.id,
      namespace: "app.TeamProfilePage",
      backButtonHref: "/team",
    },
    {
      match: pathname === "/positions",
      namespace: "app.PositionsPage",
      backButtonHref: "/team",
    },
  ];

  /** Find matching route */
  const activeRoute = routeConfig.find((r) => r.match);

  /** Fallback to dashboard */
  const translationNamespace = activeRoute?.namespace ?? "app.DashboardPage";
  const t = useTranslations(translationNamespace as any);

  return (
    /**
     * We need to reset the search bar and modal manager state whenever the route changes.
     * We cannot use templates because the state does not reset
     * when navigating to deeper segments, e.g., /tasks -> /tasks/[id].
     */
    <ModalManagerProvider key={pathname}>
      <PageTransitionProvider>
        <SearchBarProvider key={pathname} initialValue={query ?? ""}>
          <AppHeader
            signOut={signOut}
            profileLinkContainer={profileLinkContainer}
            heading={t("heading" as never)}
            backButtonHref={activeRoute?.backButtonHref}
          />
          <main>{children}</main>
        </SearchBarProvider>
      </PageTransitionProvider>

      <GuestModeModal />
    </ModalManagerProvider>
  );
}
