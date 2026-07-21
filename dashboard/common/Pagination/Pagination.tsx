"use client";

import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonVariant } from "@/ui/Button";
import { useTranslations } from "next-intl";
import { PaginationButton } from "./PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  buttonVariant?: ButtonVariant;
}

export function Pagination({
  page,
  totalPages,
  showPageItems = true,
  onChange,
  size = "small",
  className,
  buttonVariant = "secondary",
}: PaginationProps) {
  const t = useTranslations("dashboard.common.Pagination");
  const pages = createPageArray(page, totalPages);

  const renderButton = (type: "prev" | "next" | "page", targetPage: number) => {
    const isPrev = type === "prev";
    const isNext = type === "next";

    const label = isPrev
      ? t("previousPage")
      : isNext
        ? t("nextPage")
        : t("page", { pageNumber: targetPage });

    const isEdgeButton = isPrev || isNext;
    const isActivePage = page === targetPage;
    const iconSize = size === "small" ? 16 : 18;
    const isDisabled =
      (isPrev && page === 1) || (isNext && page === totalPages);

    const icon = isPrev ? (
      <ChevronLeft
        size={iconSize}
        
        
        className="shrink-0"
      />
    ) : isNext ? (
      <ChevronRight
        size={iconSize}
        
        
        className="shrink-0"
      />
    ) : undefined;

    const variant: ButtonVariant =
      isEdgeButton || !isActivePage ? buttonVariant : "accent";

    const commonProps = {
      iconLeft: icon,
      isDisabled,
      label: !isEdgeButton && targetPage,
      "aria-label": label,
      variant,
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
