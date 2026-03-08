"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import ErrorPageContainer from "@/components/layout/ErrorPageContainer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();

  if (pathname === "/companies") {
    const t = useTranslations("app.CompaniesPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/customers") {
    const t = useTranslations("app.CustomersPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/positions") {
    const t = useTranslations("app.PositionsPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/task-categories") {
    const t = useTranslations("app.TaskCategoriesPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/project-categories") {
    const t = useTranslations("app.ProjectCategoriesPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/projects") {
    const t = useTranslations("app.ProjectsPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/tasks") {
    const t = useTranslations("app.TasksPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  } else if (pathname === "/team") {
    const t = useTranslations("app.TasksPage");

    if (error.cause === "notFound") {
      return (
        <ErrorPageContainer
          reset={reset}
          heading={t("error.notFound.heading")}
          description={t("error.notFound.description")}
          resetButtonLabel={t("error.notFound.buttonLabel")}
        />
      );
    }

    return (
      <ErrorPageContainer
        reset={reset}
        heading={t("error.common.heading")}
        description={t("error.common.description")}
        resetButtonLabel={t("error.common.buttonLabel")}
      />
    );
  }

  const t = useTranslations("app.ErrorPage");

  return (
    <ErrorPageContainer
      reset={reset}
      heading={t("heading")}
      description={t("description")}
      resetButtonLabel={t("resetButtonLabel")}
    />
  );
}
