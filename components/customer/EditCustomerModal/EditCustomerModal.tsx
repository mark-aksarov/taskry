"use client";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { CustomerFormBaseSkeleton } from "../CustomerFormBase";
import { FormModal } from "@/components/common/FormModal";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";

interface EditCustomerModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  customerId: number;
}

export function EditCustomerModal({
  customerId,
  ...props
}: EditCustomerModalProps) {
  const t = useTranslations("customers.EditCustomerModal");

  const { EditCustomerFormContainer } = useGlobalContainer();

  if (!EditCustomerFormContainer) {
    throw new Error(
      "EditCustomerFormContainer is missing in GlobalContainerContext",
    );
  }

  if (!EditCustomerFormContainer) {
    throw new Error(
      "EditCustomerModal must be used within a EditCustomerFormProvider",
    );
  }

  return (
    <FormModal
      data-test="edit-customer-modal"
      formId="edit-customer-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={
        <Suspense fallback={<CustomerFormBaseSkeleton />}>
          <EditCustomerFormContainer customerId={customerId} />
        </Suspense>
      }
      {...props}
    />
  );
}
