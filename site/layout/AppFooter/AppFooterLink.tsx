"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { Link } from "react-aria-components";

const styles = tv({
  extend: focusRing,
  base: [
    "mb-3 block w-fit cursor-pointer",
    "text-sm font-normal",
    "text-gray-600 dark:text-gray-300",
    "hover:text-black dark:hover:text-white",
    "pressed:text-black dark:pressed:text-white",
  ],
});

export function AppFooterLink({ children }: { children: React.ReactNode }) {
  return <Link className={styles}>{children}</Link>;
}
