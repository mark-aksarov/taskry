"use client";

import { X } from "lucide-react";
import { Button } from "../Button";
import { twMerge } from "tailwind-merge";
import React, { useContext } from "react";
import { PressEvent, OverlayTriggerStateContext } from "react-aria-components";
import { useTranslations } from "next-intl";

interface DialogCloseButtonProps {
  iconSize?: number;
  onPress?: (e: PressEvent) => void;
  className?: string;
}

export const DialogCloseButton = ({
  iconSize = 18,
  onPress,
  className,
}: DialogCloseButtonProps) => {
  const t = useTranslations("ui.DialogCloseButton");
  const state = useContext(OverlayTriggerStateContext);

  function handlePress(e: PressEvent) {
    if (state) state.close();
    onPress?.(e);
  }

  return (
    <Button
      variant="primary"
      iconLeft={<X size={iconSize} strokeWidth={1.5} absoluteStrokeWidth />}
      onPress={handlePress}
      className={twMerge("-mr-2 rounded-full", className)}
      aria-label={t("close")}
    />
  );
};
