"use client";

import { tv } from "tailwind-variants";
import { linkStyles } from "@/ui/Link";
import { Link } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: [
    "text-gray-600 dark:text-gray-300",
    "hover:text-blue-600 dark:hover:text-blue-400",
    "pressed:text-blue-600 dark:pressed:text-blue-400",
  ],
});

interface AppFooterLinkProps {
  className?: string;
  children: React.ReactNode;
}

export function AppFooterLink({ className, children }: AppFooterLinkProps) {
  return <Link className={styles({ className })}>{children}</Link>;
}
