"use client";

import { useTranslations } from "next-intl";
import ErrorPageContainer from "@/components/layout/ErrorPageContainer";

const routeConfig: Record<string, string> = {
  companyNotFound: "app.CompaniesPage",
  customerNotFound: "app.CustomersPage",
  positionNotFound: "app.PositionsPage",
  taskCategoryNotFound: "app.TaskCategoriesPage",
  projectCategoryNotFound: "app.ProjectCategoriesPage",
  projectNotFound: "app.ProjectsPage",
  taskNotFound: "app.TasksPage",
  userNotFound: "app.UsersPage",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; cause?: unknown };
  reset: () => void;
}) {
  // Safely extract cause
  const cause = typeof error.cause === "string" ? error.cause : undefined;

  // Map cause → translation namespace
  const namespace = routeConfig[cause ?? ""] ?? "app.ErrorPage";
  const t = useTranslations(namespace as any);

  // Detect any “not found” error
  const isNotFound =
    cause === "notFound" || (cause?.endsWith("NotFound") ?? false);

  // Generic fallback namespace
  const isGeneric = namespace === "app.ErrorPage";

  // Translation keys
  const headingKey = isGeneric
    ? "heading"
    : isNotFound
      ? "error.notFound.heading"
      : "error.common.heading";

  const descriptionKey = isGeneric
    ? "description"
    : isNotFound
      ? "error.notFound.description"
      : "error.common.description";

  const buttonKey = isGeneric
    ? "buttonLabel"
    : isNotFound
      ? "error.notFound.buttonLabel"
      : "error.common.buttonLabel";

  return (
    <ErrorPageContainer
      reset={reset}
      heading={t(headingKey as never)}
      description={t(descriptionKey as never)}
      resetButtonLabel={t(buttonKey as never)}
    />
  );
}
