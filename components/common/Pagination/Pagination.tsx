"use client";

import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { PaginationButton } from "./PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonVariant } from "@/components/ui/Button/Button";

export type PaginationSize = "small" | "large";

export function createPageArray(
  page: number,
  totalPages: number,
): (number | "...")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (page <= 4) {
    return [1, 2, 3, 4, 5, "...", totalPages];
  }

  if (page >= totalPages - 3) {
    return [
      1,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, "...", page - 1, page, page + 1, "...", totalPages];
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  showPageItems?: boolean;
  onChange: (page: number) => void;
  baseUrl?: string;
  size?: PaginationSize;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  showPageItems = true,
  onChange,
  size = "small",
  className,
}: PaginationProps) {
  const t = useTranslations("common.Pagination");
  const pages = createPageArray(page, totalPages);

  const renderButton = (type: "prev" | "next" | "page", targetPage: number) => {
    const isPrev = type === "prev";
    const isNext = type === "next";

    const label = isPrev
      ? t("previousPage")
      : isNext
        ? t("nextPage")
        : t("page", { pageNumber: targetPage });

    const commonProps = {
      iconLeft: isPrev ? (
        <ChevronLeft
          size={size === "small" ? 16 : 18}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="shrink-0"
        />
      ) : isNext ? (
        <ChevronRight
          size={size === "small" ? 16 : 18}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="shrink-0"
        />
      ) : undefined,
      isDisabled: (isPrev && page === 1) || (isNext && page === totalPages),
      label: !isPrev && !isNext && targetPage,
      "aria-label": label,
      variant: (isPrev || isNext || page !== targetPage
        ? "ghost"
        : "primary") as ButtonVariant,
    };

    return (
      <PaginationButton
        key={targetPage}
        onPress={() => {
          if (targetPage === page) return;
          onChange(targetPage);
        }}
        size={size}
        {...commonProps}
      />
    );
  };

  return (
    <div
      className={twMerge(
        "flex items-center",
        size === "small" && "gap-1.5",
        size === "large" && "gap-2",
        className,
      )}
    >
      {renderButton("prev", page - 1)}
      {showPageItems && (
        <>
          {pages.map((p, idx) => (
            <Fragment
              key={typeof p === "number" ? `page-${p}` : `ellipsis-${idx}`}
            >
              {typeof p === "number" ? (
                renderButton("page", p)
              ) : (
                <div aria-hidden>{p}</div>
              )}
            </Fragment>
          ))}
        </>
      )}
      {renderButton("next", page + 1)}
    </div>
  );
}
