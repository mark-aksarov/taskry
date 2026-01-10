"use client";

import { useOptimistic } from "react";
import { useLocale } from "next-intl";
import { twMerge } from "tailwind-merge";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEntityPagination } from "./EntityPaginationContext";
import { Pagination, PaginationProps } from "@/components/common/Pagination";

interface EntityContainerPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  className?: string;
}

export function EntityContainerPagination({
  page,
  pageSize,
  totalPages,
  className,
}: EntityContainerPaginationProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { startTransition } = useEntityPagination();
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
