import { Ellipsis } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { Button, ButtonProps } from "@/ui/Button";

export function ItemBaseActionMenuButton({ className, ...props }: ButtonProps) {
  const t = useTranslations("dashboard.common.ItemBaseActionMenuTrigger");

  return (
    <Button
      aria-label={t("ariaLabel")}
      variant="ghost"
      iconLeft={
        props.isPending ? undefined : (
          <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
        )
      }
      className={twMerge("rounded-full", className)}
      {...props}
    />
  );
}
