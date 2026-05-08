"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { Link } from "react-aria-components";
import { ArrowRight } from "lucide-react";

const styles = tv({
  extend: focusRing,

  base: [
    "group flex w-full flex-col gap-4",
    "rounded-lg border p-6",
    "border-(--border-primary)",
    "pressed:bg-(--surface-secondary-pressed)/50 bg-(--surface-secondary) hover:bg-(--surface-secondary-hover)/50",
  ],

  slots: {
    content: "flex flex-1 flex-col items-start gap-1",
    header: "flex items-center justify-between",
    heading: "text-lg font-semibold text-(--text-primary)",
    subtext: "text-sm font-medium text-(--text-tertiary)",
  },
});

interface DocsCardLinkProps {
  href: string;
  heading: string;
  subtext: string;
}

export function DocsCardLink({ href, heading, subtext }: DocsCardLinkProps) {
  const {
    base,
    header: headerStyles,
    heading: headingStyles,
    subtext: subtextStyles,
  } = styles();

  return (
    <Link href={href} className={base}>
      <div className={headerStyles()}>
        <div className={headingStyles()}>{heading}</div>
        <ArrowRight size={20} absoluteStrokeWidth strokeWidth={1.5} />
      </div>
      <div className={subtextStyles()}>{subtext}</div>
    </Link>
  );
}
