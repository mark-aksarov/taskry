"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { usePathname } from "next/navigation";
import { baseButtonStyles, focusRing, RACButton } from "@/components/ui";

export const styles = tv({
  extend: focusRing,
  base: [
    baseButtonStyles.base,
    "not:focus-visible:outline-0 w-full gap-4 px-4 py-3 text-sm font-bold text-black focus-visible:outline-2 dark:text-white",
  ],
  variants: {
    isSelected: {
      false:
        "pressed:bg-gray-300 dark:pressed:bg-gray-700 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700",
      true: "bg-blue-600 text-white! dark:bg-blue-700",
    },
  },
});

interface AppNavItemProps {
  href?: string;
  onPress?: () => void;
  children: React.ReactNode;
}

export const AppNavigationItem = ({
  href,
  onPress,
  children,
}: AppNavItemProps) => {
  const pathname = usePathname();

  if (href) {
    return (
      <Link
        href={href}
        className={styles({
          isSelected: pathname === href,
        })}
      >
        {children}
      </Link>
    );
  }

  return (
    <RACButton onClick={onPress} className={styles}>
      {children}
    </RACButton>
  );
};
