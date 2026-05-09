"use client";

import { useOptimistic } from "react";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { ButtonVariant } from "@/ui/Button";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "../common/PageTransitionContext";
import { Pagination, PaginationProps } from "@/dashboard/common/Pagination";

interface EntityContainerPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  className?: string;
  buttonVariant?: ButtonVariant;
}

export function EntityContainerPagination(
  props: EntityContainerPaginationProps,
) {
  const { isFilteringPending, isSortingPending } = usePageTransition();

  if (isFilteringPending || isSortingPending) {
    return null;
  }

  return <EntityContainerPaginationInner {...props} />;
}

export function EntityContainerPaginationInner({
  page,
  pageSize,
  totalPages,
  className,
  buttonVariant,
}: EntityContainerPaginationProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startPaginationTransition: startTransition } = usePageTransition();
  const [optimisticPage, setOptimisticPage] = useOptimistic(
    page,
    (_, newPage: number) => newPage,
  );

  function handleChange(targetPage: number) {
    startTransition(() => {
      setOptimisticPage(targetPage);

      const params = new URLSearchParams(searchParams.toString());
      params.set("page", targetPage.toString());
      params.set("pageSize", pageSize.toString());

      router.push(`${pathname}?${params.toString()}`, {
        locale,
        scroll: false,
      });
    });
  }

  const paginationProps: PaginationProps = {
    page: optimisticPage,
    totalPages,
    onChange: handleChange,
    buttonVariant,
  };

  return (
    <>
      {totalPages > 1 && (
        <div className={twMerge("flex justify-center", className)}>
          <Pagination
            {...paginationProps}
            size="large"
            className="max-md:hidden"
          />
          <Pagination {...paginationProps} className="md:hidden" />
        </div>
      )}
    </>
  );
}
