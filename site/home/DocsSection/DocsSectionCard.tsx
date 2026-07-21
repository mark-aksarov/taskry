"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { ChevronRight } from "lucide-react";
import { Link } from "react-aria-components";

const styles = tv({
  extend: focusRing,

  base: [
    "group flex w-full items-center justify-start gap-6",
    "rounded-2xl border p-6",
    "border-(--border-secondary) hover:border-(--border-primary)",
    "bg-(--surface-primary)",
  ],

  slots: {
    content: "flex flex-1 flex-col items-start gap-1 overflow-hidden",
    heading: "max-w-full truncate text-lg font-bold text-(--text-primary)",
    subtext: "max-w-full truncate text-base font-medium text-(--text-tertiary)",
    icon: [
      "ml-auto shrink-0",
      "text-(--text-tertiary)",
      "transition-transform group-hover:translate-x-1",
    ],
  },
});

interface DocsSectionCardProps {
  href: string;
  iconLeft?: React.ReactNode;
  heading: string;
  subtext: string;
}

export function DocsSectionCard({
  href,
  heading,
  subtext,
  iconLeft,
}: DocsSectionCardProps) {
  const {
    base,
    content,
    heading: headingStyles,
    subtext: subtextStyles,
    icon,
  } = styles();

  return (
    <Link href={href} className={base}>
      {iconLeft}

      <div className={content()}>
        <div className={headingStyles()}>{heading}</div>
        <div className={subtextStyles()}>{subtext}</div>
      </div>

      <ChevronRight size={22}  className={icon()} />
    </Link>
  );
}
