import {
  Button,
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogFooter,
  DialogHeader,
  DialogHeading,
} from "@/components/ui";
import { NewSubtaskForm } from "../NewSubtaskForm";
import { useTranslations } from "next-intl";

export function NewSubtaskDialog() {
  const t = useTranslations("subtasks.NewSubtaskDialog");

  return (
    <Dialog className="md:w-[300px]">
      <DialogHeader className="px-4! py-3!">
        <DialogHeading className="text-base!">
          {t("dialogHeading")}
        </DialogHeading>
        <DialogCloseButton />
      </DialogHeader>
      <DialogBody className="p-4!">
        <NewSubtaskForm />
      </DialogBody>
      <DialogFooter className="border-none p-4! pt-0!">
        <Button
          variant="primary"
          size="medium"
          label={t("addButtonLabel")}
          className="w-full justify-center p-3"
        />
      </DialogFooter>
    </Dialog>
  );
}
