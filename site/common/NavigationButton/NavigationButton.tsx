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
    "border-slate-200 bg-white hover:bg-slate-50",
    "dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700",
  ],

  slots: {
    content: "flex flex-col items-start gap-1",
    heading: "text-lg font-bold text-black dark:text-white",
    subtext: "text-sm font-medium text-slate-600 dark:text-slate-300",
    icon: [
      "ml-auto text-slate-600 dark:text-slate-300",
      "transition-transform group-hover:translate-x-1",
    ],
  },
});

interface NavigationButtonProps {
  href: string;
  iconLeft?: React.ReactNode;
  heading: string;
  subtext: string;
}

export function NavigationButton({
  href,
  heading,
  subtext,
  iconLeft,
}: NavigationButtonProps) {
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

      <ChevronRight size={22} strokeWidth={1.5} className={icon()} />
    </Link>
  );
}
