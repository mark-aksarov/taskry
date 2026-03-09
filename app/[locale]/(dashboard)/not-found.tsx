"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import NotFoundPageContainer from "@/components/layout/NotFoundPageContainer";

export default function NotFound() {
  const pathname = usePathname();

  const routeConfig = [
    {
      match: (p: string) => p.startsWith("/customers"),
      namespace: "app.CustomersPage",
      linkHref: "/customers",
    },
    {
      match: (p: string) => p.startsWith("/projects"),
      namespace: "app.ProjectsPage",
      linkHref: "/projects",
    },
    {
      match: (p: string) => p.startsWith("/tasks"),
      namespace: "app.TasksPage",
      linkHref: "/tasks",
    },
    {
      match: (p: string) => p.startsWith("/team") || p.startsWith("/profile"),
      namespace: "app.UsersPage",
      linkHref: "/team",
    },
  ];

  // Default values
  let namespace = "app.NotFoundPage";
  let linkHref = "/";
  let headingKey = "heading";
  let descriptionKey = "description";
  let buttonKey = "toHome";

  // Find matching config
  const matched = routeConfig.find((cfg) => cfg.match(pathname));

  if (matched) {
    namespace = matched.namespace;
    linkHref = matched.linkHref;
    headingKey = "error.notFound.heading";
    descriptionKey = "error.notFound.description";
    buttonKey = "error.notFound.buttonLabel";
  }

  const t = useTranslations(namespace as any);

  return (
    <NotFoundPageContainer
      heading={t(headingKey as never)}
      description={t(descriptionKey as never)}
      linkHref={linkHref}
      linkLabel={t(buttonKey as never)}
    />
  );
}
