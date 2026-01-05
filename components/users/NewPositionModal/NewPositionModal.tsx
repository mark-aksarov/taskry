import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { FormBaseModal } from "@/components/common/FormBaseModal";

interface NewPositionModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  newPositionForm: React.ReactNode;
}

export function NewPositionModal({
  newPositionForm,
  ...props
}: NewPositionModalProps) {
  const t = useTranslations("users.NewPositionModal");

  return (
    <FormBaseModal
      formId="new-position-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={newPositionForm}
      className="md:w-[350px]"
      {...props}
    />
  );
}
