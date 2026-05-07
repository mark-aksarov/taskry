"use client";

import { Link } from "@/ui/Link";
import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DocsPaginationLinkProps {
  href: string;
  description: string;
  variant: "prev" | "next";
}

const styles = tv({
  extend: focusRing,
  base: [
    "text-base font-semibold text-(--text-primary)",
    "hover:text-blue-600 dark:hover:text-blue-400",
    "pressed:text-blue-600 dark:pressed:text-blue-400",
  ],
});

export function DocsPaginationLink({
  href,
  description,
  variant,
}: DocsPaginationLinkProps) {
  return (
    <Link href={href} className={styles()}>
      {variant === "prev" && (
        <ChevronLeft size={18} strokeWidth={1.5} className="shrink-0" />
      )}
      {description}
      {variant === "next" && (
        <ChevronRight size={18} strokeWidth={1.5} className="shrink-0" />
      )}
    </Link>
  );
}
