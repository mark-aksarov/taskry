"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { AppHeader } from "@/components/layout/AppHeader";

interface DashboardTemplateProps {
  tasksSearchContainer: React.ReactNode;
  projectsSearchContainer: React.ReactNode;
  profileLinkContainer: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardTemplate({
  tasksSearchContainer,
  projectsSearchContainer,
  profileLinkContainer,
  children,
}: DashboardTemplateProps) {
  const pathname = usePathname();
  const params = useParams();

  const containerProps = {
    tasksSearchContainer,
    projectsSearchContainer,
    profileLinkContainer,
  };

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
    <>
      <AppHeader
        {...containerProps}
        heading={t("heading" as never)}
        backButtonHref={activeRoute?.backButtonHref}
      />
      <main>{children}</main>
    </>
  );
}
