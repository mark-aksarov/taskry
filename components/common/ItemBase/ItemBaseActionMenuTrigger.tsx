import {
  Button,
  DialogCloseButton,
  DialogHeader,
  DialogHeading,
  MenuTriggerProps,
} from "@/components/ui";
import { Ellipsis } from "lucide-react";
import { ResponsiveMenuTrigger } from "../ResponsiveMenuTrigger";
import { twMerge } from "tailwind-merge";
import { useTranslations } from "next-intl";

export function ItemBaseActionMenuTrigger<T extends object = any>({
  className,
  children,
}: Pick<MenuTriggerProps<T>, "children"> & { className?: string }) {
  const t = useTranslations("common.ItemBase.ItemBaseActionMenuTrigger");

  return (
    <ResponsiveMenuTrigger
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
    >
      {children}
    </ResponsiveMenuTrigger>
  );
}
