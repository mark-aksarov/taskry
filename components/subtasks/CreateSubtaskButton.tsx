"use client";

import { Plus } from "lucide-react";
import { tv } from "tailwind-variants";
import { linkStyles } from "../ui/Link";
import { useTranslations } from "next-intl";
import { useModal } from "../common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { composeRenderProps, ButtonProps, Button } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: "self-start text-sm font-semibold",
});

export function CreateSubtasksButton({
  className,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  const t = useTranslations("subtasks.CreateSubtasksButton");

  // Show guest modal for guests
  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onModalOpenChange } = useModal("createSubtask");

  function handlePress() {
    guestGuard(() => onModalOpenChange(true));
  }

  return (
    <Button
      {...props}
      data-test="create-subtask-button"
      className={composeRenderProps(className, (className, renderProps) =>
        styles({ ...renderProps, variant: "primary", className }),
      )}
      onPress={handlePress}
    >
      <Plus size={16} strokeWidth={1.5} absoluteStrokeWidth />
      {t("label")}
    </Button>
  );
}
