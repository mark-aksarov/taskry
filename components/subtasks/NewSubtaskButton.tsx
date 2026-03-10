"use client";

import { Plus } from "lucide-react";
import { tv } from "tailwind-variants";
import { linkStyles } from "../ui/Link";
import { useTranslations } from "next-intl";
import { useCreateSubtask } from "./CreateSubtaskContext";
import { useGuestModeModal } from "../common/GuestModeModal";
import { useCurrentUser } from "../common/CurrentUserContext";
import { composeRenderProps, ButtonProps, Button } from "react-aria-components";

const styles = tv({
  extend: linkStyles,
  base: "self-start text-sm font-semibold",
});

export function NewSubtasksButton({
  className,
  ...props
}: ButtonProps & React.RefAttributes<HTMLButtonElement>) {
  const t = useTranslations("subtasks.NewSubtasksButton");

  const { onModalOpenChange } = useCreateSubtask();
  const { isGuest } = useCurrentUser();
  const { onOpenChange: onGuestModeModalOpenChange } = useGuestModeModal();

  function handlePress() {
    if (isGuest) {
      onGuestModeModalOpenChange(true);
      return;
    }

    onModalOpenChange(true);
  }

  return (
    <Button
      {...props}
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
