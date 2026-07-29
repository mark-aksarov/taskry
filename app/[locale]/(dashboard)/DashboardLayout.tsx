"use client";

import {
  AppSidebar,
  AppSidebarBody,
  AppSidebarHeader,
} from "@/dashboard/layout/AppSidebar";

import { useTranslations } from "next-intl";
import { Logo } from "@/dashboard/layout/Logo";
import { usePathname } from "@/i18n/navigation";
import { searchQueryParam } from "@/lib/schemas/base";
import { AppHeader } from "@/dashboard/layout/AppHeader";
import { useParams, useSearchParams } from "next/navigation";
import { AppNavigation } from "@/dashboard/layout/AppNavigation";
import { DemoDataModal } from "@/dashboard/demoData/DemoDataModal";
import { ModalManagerProvider } from "@/common/ModalManagerContext";
import { SearchBarProvider } from "@/dashboard/search/SearchBar/index";
import { PageTransitionProvider } from "@/dashboard/common/PageTransitionContext";
import { DemoDataProvider } from "@/dashboard/demoData/DemoDataContext";

interface DashboardLayoutProps {
  profileLinkContainer: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardLayout({
  profileLinkContainer,
  children,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const validQuery = searchQueryParam.parse(query);

  /** Route configuration */
  const routeConfig = [
    {
      match: pathname === "/clients",
      namespace: "app.ClientsPage",
    },
    {
      match: pathname.startsWith("/clients") && params.id,
      namespace: "app.ClientDetailPage",
      backButtonHref: "/clients",
    },
    {
      match: pathname === "/companies",
      namespace: "app.CompaniesPage",
      backButtonHref: "/clients",
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
    <div className="flex">
      <ModalManagerProvider key={pathname}>
        <AppSidebar className="sticky top-0 z-2 h-dvh flex-none shadow-sm max-xl:hidden">
          <AppSidebarHeader>
            <Logo />
          </AppSidebarHeader>
          <AppSidebarBody>
            <AppNavigation />
          </AppSidebarBody>
        </AppSidebar>

        {/* flex items have min-width:auto in row; min-w-0 prevents filters overflow when empty filtering results */}
        <div className="flex min-w-0 flex-auto flex-col">
          {/**
           * We need to reset the search bar and modal manager state whenever the route changes.
           * We cannot use templates because the state does not reset
           * when navigating to deeper segments, e.g., /tasks -> /tasks/[id].
           */}
          <PageTransitionProvider>
            <SearchBarProvider key={pathname} initialValue={validQuery ?? ""}>
              <DemoDataProvider>
                <AppHeader
                  profileLinkContainer={profileLinkContainer}
                  heading={t("heading" as never)}
                  backButtonHref={activeRoute?.backButtonHref}
                />
                <main>{children}</main>

                <DemoDataModal />
              </DemoDataProvider>
            </SearchBarProvider>
          </PageTransitionProvider>
        </div>
      </ModalManagerProvider>
    </div>
  );
}
