"use client";

import Link from "next/link";
import { tv } from "tailwind-variants";
import { Button } from "react-aria-components";
import { focusRing } from "@/components/ui/styles";
import { baseButtonStyles } from "@/components/ui/Button";

export const styles = tv({
  extend: focusRing,
  base: [
    baseButtonStyles.base,
    "not:focus-visible:outline-0 gap-4 px-4 py-3 text-sm font-bold text-black focus-visible:outline-2 dark:text-white",
  ],
  variants: {
    variant: {
      primary: "",
      secondary: "",
    },
    isActive: {
      false:
        "pressed:bg-gray-300 dark:pressed:bg-gray-700 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700",
      true: "bg-blue-600 text-white! dark:bg-blue-700",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isActive: true,
      class: "bg-blue-600 text-white! dark:bg-blue-700",
    },
    {
      variant: "secondary",
      isActive: true,
      class: "bg-gray-100 text-blue-600! dark:bg-gray-700 dark:text-blue-300!",
    },
    {
      isActive: false,
      class:
        "pressed:bg-gray-300 dark:pressed:bg-gray-700 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-600 dark:active:bg-gray-700",
    },
  ],
});

type NavigationButtonVariant = "primary" | "secondary";

interface NavigationButtonProps {
  isActive?: boolean;
  variant?: NavigationButtonVariant;
  href?: string;
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
  "data-test"?: string;
}

export const NavigationButton = ({
  isActive = false,
  variant = "primary",
  href,
  onPress,
  children,
  className,
  ...props
}: NavigationButtonProps) => {
  if (href) {
    return (
      <Link
        href={href}
        className={styles({
          variant,
          isActive,
          className,
        })}
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <Button
      {...props}
      onPress={onPress}
      className={styles({ variant, isActive, className })}
    >
      {children}
    </Button>
  );
};
