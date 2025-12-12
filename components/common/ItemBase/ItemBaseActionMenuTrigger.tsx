import {
  Button,
  DialogHeader,
  DialogHeading,
  MenuTriggerProps,
  DialogCloseButton,
} from "@/components/ui";
import { Ellipsis } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";
import { ResponsiveMenuTrigger } from "../ResponsiveMenuTrigger";

export function ItemBaseActionMenuTrigger<T extends object = any>({
  className,
  ...props
}: MenuTriggerProps<T> & { className?: string }) {
  const t = useTranslations("common.ItemBase.ItemBaseActionMenuTrigger");

  return (
    <ResponsiveMenuTrigger
      {...props}
      placement="bottom right"
      renderDialogHeader={() => (
        <DialogHeader>
          <DialogHeading>{t("heading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
      )}
      renderButton={() => (
        <Button
          aria-label={t("ariaLabel")}
          variant="ghost"
          iconLeft={
            <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
          }
          className={twMerge("rounded-full", className)}
        />
      )}
    />
  );
}
