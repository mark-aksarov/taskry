"use client";

import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { PaginationButton } from "./PaginationButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ButtonVariant } from "@/components/ui/Button/Button";

export type PaginationSize = "small" | "large";

export function createPageArray(
  page: number,
  totalPages: number,
  size: PaginationSize = "small",
): (number | "...")[] {
  if (size === "small") {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "...", page, "...", totalPages];
  }

  if (size === "large") {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (page >= totalPages - 3) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, "...", page - 1, page, page + 1, page + 2, "...", totalPages];
  }

  return [];
}

interface PaginationProps {
  page: number;
  totalPages: number;
  showPageItems?: boolean;
  onChange?: (page: number) => void;
  baseUrl?: string;
  pageSize?: number;
  size?: PaginationSize;
  className?: string;
}

export function Pagination({
  page,
  totalPages,
  showPageItems = true,
  onChange,
  baseUrl,
  pageSize,
  size = "small",
  className,
}: PaginationProps) {
  const pages = createPageArray(page, totalPages, size);

  const getHref = (p: number) => `${baseUrl}?page=${p}&pageSize=${pageSize}`;

  const renderButton = (type: "prev" | "next" | "page", targetPage: number) => {
    const isPrev = type === "prev";
    const isNext = type === "next";

    const commonProps = {
      iconLeft: isPrev ? (
        <ChevronLeft size={18} strokeWidth={1.5} absoluteStrokeWidth />
      ) : isNext ? (
        <ChevronRight size={18} strokeWidth={1.5} absoluteStrokeWidth />
      ) : undefined,
      isDisabled: (isPrev && page === 1) || (isNext && page === totalPages),
      label: !isPrev && !isNext && targetPage,
      variant: (isPrev || isNext || page !== targetPage
        ? "ghost"
        : "primary") as ButtonVariant,
    };

    if (onChange) {
      return (
        <PaginationButton
          key={targetPage}
          onPress={() => onChange(targetPage)}
          {...commonProps}
        />
      );
    }

    return (
      <PaginationButton
        key={targetPage}
        as="a"
        href={getHref(targetPage)}
        {...commonProps}
      />
    );
  };

  return (
    <div className={twMerge("inline-flex items-center gap-2", className)}>
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
                <span aria-hidden>{p}</span>
              )}
            </Fragment>
          ))}
        </>
      )}
      {renderButton("next", page + 1)}
    </div>
  );
}
