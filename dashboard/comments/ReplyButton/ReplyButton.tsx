"use client";

import React from "react";
import { Reply } from "lucide-react";
import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { Button } from "react-aria-components";
import { focusRing } from "@/ui/styles";

interface ReplyButtonProps {
  isDisabled?: boolean;
}

const styles = tv({
  extend: focusRing,
  base: "pressed:text-gray-600 dark:pressed:text-gray-300 flex cursor-pointer items-center gap-1.5 text-xs font-bold text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-200",
  variants: {
    isDisabled: {
      true: "pointer-events-none cursor-default text-gray-400 dark:text-gray-500",
    },
  },
});

export function ReplyButton({ isDisabled }: ReplyButtonProps) {
  const t = useTranslations("dashboard.comments");

  return (
    <Button
      className={(renderProps) => styles({ ...renderProps })}
      isDisabled={isDisabled}
    >
      <Reply size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {t("ReplyButton")}
    </Button>
  );
}
