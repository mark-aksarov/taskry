"use client";

import { tv } from "tailwind-variants";
import { linkStyles } from "@/ui/Link";
import { composeRenderProps, Link } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: "pressed:text-(--text-link) text-(--text-tertiary) hover:text-(--text-link)",
});

interface AppFooterLinkProps {
  className?: string;
  children: React.ReactNode;
}

export function AppFooterLink({ className, children }: AppFooterLinkProps) {
  return (
    <Link
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, className }),
      )}
    >
      {children}
    </Link>
  );
}
