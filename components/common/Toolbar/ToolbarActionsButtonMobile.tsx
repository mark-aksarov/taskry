"use client";

import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";

interface ToolbarActionsButtonMobileProps extends ButtonProps {
  "data-test"?: string;
}

export function ToolbarActionsButtonMobile(
  props: ToolbarActionsButtonMobileProps,
) {
  const t = useTranslations("common.ToolbarActionsButtonMobile");

  return (
    <Button
      aria-label={t("ariaLabel")}
      variant="outlined"
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="md:hidden"
      {...props}
    />
  );
}
