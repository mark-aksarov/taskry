import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/components/ui/Button";
import { usePageTransition } from "../PageTransitionContext";

interface ToolbarActionsButtonDesktopProps extends ButtonProps {
  "data-test"?: string;
}

export function ToolbarActionsButtonDesktop({
  isDisabled,
  ...props
}: ToolbarActionsButtonDesktopProps) {
  const t = useTranslations("common.ToolbarActionsButtonDesktop");
  const { isFilteringPending, isSortingPending, isPaginationPending } =
    usePageTransition();

  return (
    <Button
      isDisabled={
        isFilteringPending ||
        isSortingPending ||
        isPaginationPending ||
        isDisabled
      }
      variant="outlined"
      label={t("label")}
      iconLeft={<Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />}
      className="max-md:hidden"
      {...props}
    />
  );
}
