"use client";

import { Pagination } from "@/components/common/Pagination";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface EntityContainerPaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
}

export function EntityContainerPagination({
  page,
  pageSize,
  totalPages,
}: EntityContainerPaginationProps) {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(targetPage: number) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", targetPage.toString());
      if (pageSize) params.set("pageSize", pageSize.toString());

      router.push(`${pathname}?${params.toString()}`, { locale });
    });
  }

  const paginationProps = {
    page,
    totalPages,
    pageSize,
    onChange: handleChange,
    isPending,
  };

  return (
    <>
      {isPending && <div className="flex justify-center">Loading...</div>}
      {totalPages > 1 && (
        <div className="flex justify-center">
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
