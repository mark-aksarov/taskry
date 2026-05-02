"use client";

import { tv } from "tailwind-variants";
import { linkStyles } from "@/ui/Link";
import { composeRenderProps, Link } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: [
    "relative py-1 pl-4",
    "hover:text-blue-600 dark:hover:text-blue-400",
    "pressed:text-blue-600 dark:pressed:text-blue-400",
  ],
  variants: {
    isActive: {
      false: "text-gray-600 dark:text-gray-300",
      true: "font-semibold text-blue-600 dark:text-blue-400",
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
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 -left-px block w-px bg-blue-600 dark:bg-blue-400"
        />
      )}
    </Link>
  );
}
