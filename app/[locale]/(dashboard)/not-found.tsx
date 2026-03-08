"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";

export default function NotFound() {
  const pathname = usePathname();

  if (pathname.startsWith("/customers")) {
    const t = useTranslations("app.CustomersPage");

    return (
      <NotFoundPageContainer
        heading={t("error.notFound.heading")}
        description={t("error.notFound.description")}
        linkHref="/customers"
        linkLabel={t("error.notFound.buttonLabel")}
      />
    );
  } else if (pathname.startsWith("/projects")) {
    const t = useTranslations("app.ProjectsPage");

    return (
      <NotFoundPageContainer
        heading={t("error.notFound.heading")}
        description={t("error.notFound.description")}
        linkHref="/projects"
        linkLabel={t("error.notFound.buttonLabel")}
      />
    );
  } else if (pathname.includes("tasks")) {
    const t = useTranslations("app.TasksPage");

    return (
      <NotFoundPageContainer
        heading={t("error.notFound.heading")}
        description={t("error.notFound.description")}
        linkHref="/projects"
        linkLabel={t("error.notFound.buttonLabel")}
      />
    );
  } else if (pathname.startsWith("/team") || pathname.startsWith("/profile")) {
    const t = useTranslations("app.UsersPage");

    return (
      <NotFoundPageContainer
        heading={t("error.notFound.heading")}
        description={t("error.notFound.description")}
        linkHref="/projects"
        linkLabel={t("error.notFound.buttonLabel")}
      />
    );
  }

  const t = useTranslations("app.DashboardNotFoundPage");

  return (
    <NotFoundPageContainer
      heading={t("heading")}
      description={t("description")}
      linkHref="/"
      linkLabel={t("toHome")}
    />
  );
}
