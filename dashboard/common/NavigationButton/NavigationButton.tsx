"use client";

import { Loader2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { tv } from "tailwind-variants";
import { Button } from "react-aria-components";
import { focusRing } from "@/ui/styles";
import { baseButtonStyles } from "@/ui/Button";

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
    isPending: {
      true: "pointer-events-none text-gray-500 dark:text-gray-400",
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
  iconLeft?: React.ReactNode;
  label: React.ReactNode;
  className?: string;
  isPending?: boolean;
  "data-test"?: string;
}

export const NavigationButton = ({
  isActive = false,
  variant = "primary",
  href,
  onPress,
  isPending,
  iconLeft,
  label,
  className,
  ...props
}: NavigationButtonProps) => {
  const icon = isPending ? (
    <Loader2
      data-testid="loader-icon"
      size={18}
      strokeWidth={1.75}
      absoluteStrokeWidth
      className="animate-spin"
    />
  ) : (
    iconLeft
  );

  if (href) {
    return (
      <Link
        href={href}
        className={styles({
          variant,
          isActive,
          className,
          isPending,
        })}
        {...props}
      >
        {icon}
        {label}
      </Link>
    );
  }

  return (
    <Button
      {...props}
      onPress={onPress}
      isPending={isPending}
      className={styles({ variant, isActive, className, isPending })}
    >
      {icon}
      {label}
    </Button>
  );
};
