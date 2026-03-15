"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { AppHeader } from "@/components/layout/AppHeader";
import { useParams, useSearchParams } from "next/navigation";
import { SearchModalProvider } from "@/components/search/SearchModal";
import { SearchBarProvider } from "@/components/search/SearchBar/index";
import { PageTransitionProvider } from "@/components/common/PageTransitionContext";

interface SharedLayoutProps {
  profileLinkContainer: React.ReactNode;
  children: React.ReactNode;
}

export default function SharedLayout({
  profileLinkContainer,
  children,
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
      namespace: "app.UsersPage",
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
    {
      match: pathname.startsWith("/profile"),
      namespace: "app.ProfilePage",
    },
  ];

  /** Find matching route */
  const activeRoute = routeConfig.find((r) => r.match);

  /** Fallback to dashboard */
  const translationNamespace = activeRoute?.namespace ?? "app.DashboardPage";
  const t = useTranslations(translationNamespace as any);

  return (
    <PageTransitionProvider>
      {/**
       * We need to reset the search bar state whenever the route changes.
       * We cannot use templates because the search bar value does not reset
       * when navigating to deeper segments, e.g., /tasks -> /tasks/[id].
       */}
      <SearchBarProvider key={pathname} initialValue={query ?? ""}>
        <SearchModalProvider>
          <AppHeader
            profileLinkContainer={profileLinkContainer}
            heading={t("heading" as never)}
            backButtonHref={activeRoute?.backButtonHref}
          />
          <main>{children}</main>
        </SearchModalProvider>
      </SearchBarProvider>
    </PageTransitionProvider>
  );
}
