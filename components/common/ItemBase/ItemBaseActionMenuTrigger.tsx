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

export type ItemBaseActionMenuTriggerProps<T extends object = any> =
  MenuTriggerProps<T> & {
    iconLeft?: React.ReactElement;
    className?: string;
    "trigger-data-test"?: string;
  };

export function ItemBaseActionMenuTrigger<T extends object = any>({
  iconLeft,
  className,
  "trigger-data-test": triggerDataTest,
  ...props
}: ItemBaseActionMenuTriggerProps<T>) {
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
          data-test={triggerDataTest}
          variant="ghost"
          iconLeft={
            iconLeft ?? (
              <Ellipsis size={16} strokeWidth={1.5} absoluteStrokeWidth />
            )
          }
          className={twMerge("rounded-full", className)}
        />
      )}
    />
  );
}
