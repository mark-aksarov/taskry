import { useTranslations } from "next-intl";
import { DialogBody } from "@/components/ui";

export function NewSubtaskDialogBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("subtasks.NewSubtaskDialog");

  return <DialogBody className="p-4!">{children}</DialogBody>;
}
