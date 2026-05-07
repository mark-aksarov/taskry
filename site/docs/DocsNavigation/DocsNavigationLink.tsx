"use client";

import { tv } from "tailwind-variants";
import { linkStyles } from "@/ui/Link";
import { composeRenderProps, Link } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: [
    "relative py-1 pl-4",
    "pressed:text-(--text-info) hover:text-(--text-info)",
  ],
  variants: {
    isActive: {
      false: "text-(--text-tertiary)",
      true: "font-semibold text-(--text-info)",
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
          className="absolute top-0 bottom-0 -left-px block w-px bg-(--text-info)"
        />
      )}
    </Link>
  );
}
