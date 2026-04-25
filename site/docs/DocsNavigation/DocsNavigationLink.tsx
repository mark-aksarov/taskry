"use client";

import { tv } from "tailwind-variants";
import { linkStyles } from "@/ui/Link";
import { composeRenderProps, Link } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: [
    "text-gray-600 dark:text-gray-300",
    "hover:text-blue-600 dark:hover:text-blue-400",
    "pressed:text-blue-600 dark:pressed:text-blue-400",
  ],
  variants: {
    isActive: {
      true: "text-blue-600 dark:text-blue-400",
    },
  },
});

interface DocsNavigationLinkProps {
  href: string;
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
}

export function DocsNavigationLink({
  href,
  isActive,
  className,
  children,
}: DocsNavigationLinkProps) {
  return (
    <Link
      href={href}
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, isActive, className }),
      )}
    >
      {children}
    </Link>
  );
}
