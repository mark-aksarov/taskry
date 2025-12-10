"use client";

import { Button } from "@/components/ui";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PaginationProps = {
  page: number;
  totalPages: number;
  pageSize: number;
  onChange?: (page: number) => void;
  baseUrl?: string;
};

export function Pagination({
  page,
  totalPages,
  pageSize,
  onChange,
  baseUrl,
}: PaginationProps) {
  const t = useTranslations("common.Pagination");

  const getHref =
    baseUrl && ((p: number) => `${baseUrl}?page=${p}&pageSize=${pageSize}`);

  const createPageArray = () => {
    if (totalPages < 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, "…", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "…", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "…", page, "…", totalPages];
  };

  const pages = createPageArray();

  const buttonClasses =
    "rounded-full max-md:w-8 max-md:h-8 md:w-9 md:h-9 justify-center";

  return (
    <div className="inline-flex items-center gap-2">
      <Button
        as={getHref ? "a" : "button"}
        {...(getHref ? { href: getHref(page - 1) } : {})}
        {...(onChange ? { onPress: () => onChange(page - 1) } : {})}
        iconLeft={
          <ChevronLeft size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        variant="ghost"
        size="small"
        aria-label={t("previousPage")}
        isDisabled={page === 1}
        className={buttonClasses}
      />

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <Button
            as={getHref ? "a" : "button"}
            {...(getHref ? { href: getHref(p) } : {})}
            {...(onChange ? { onPress: () => onChange(p) } : {})}
            key={idx}
            label={p}
            variant={p === page ? "primary" : "ghost"}
            size="small"
            aria-label={t("page", { pageNumber: p })}
            aria-current={p === page ? "page" : undefined}
            className={buttonClasses}
          />
        ) : (
          <span
            key={idx}
            aria-hidden="true"
            className={twMerge(
              buttonClasses,
              "inline-flex items-center text-sm font-bold text-black dark:text-white",
            )}
          >
            {p}
          </span>
        ),
      )}

      <Button
        as={getHref ? "a" : "button"}
        {...(getHref ? { href: getHref(page + 1) } : {})}
        {...(onChange ? { onPress: () => onChange(page + 1) } : {})}
        iconLeft={
          <ChevronRight size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        variant="ghost"
        size="small"
        aria-label={t("nextPage")}
        isDisabled={page === totalPages}
        className={buttonClasses}
      />
    </div>
  );
}
