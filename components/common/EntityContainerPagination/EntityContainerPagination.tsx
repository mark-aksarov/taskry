"use client";

import { useOptimistic } from "react";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "../PageTransitionContext";
import { Pagination, PaginationProps } from "@/components/common/Pagination";

interface EntityContainerPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  className?: string;
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

      //Внутренне router.push() уже обернут в startTransition, вложенные Transition не запрещены, поэтому вызываем это для текущего перехода и отслеживаем isPending
      //https://github.com/vercel/next.js/blob/canary/packages/next/src/client/components/app-router-instance.ts#L467
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
