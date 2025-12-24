"use client";

import { useTranslations } from "next-intl";
import { ModalProps } from "@/components/ui";
import { Suspense, useContext } from "react";
import { CustomerFormBaseSkeleton } from "../CustomerFormBase";
import { FormBaseModal } from "@/components/common/FormBaseModal";
import { EditCustomerFormClientContainerContext } from "../EditCustomerFormClientContainerContext";

interface EditCustomerModalProps
  extends Pick<ModalProps, "isOpen" | "onOpenChange"> {
  customerId: number;
}

export function EditCustomerModal({
  customerId,
  ...props
}: EditCustomerModalProps) {
  const t = useTranslations("customers.EditCustomerModal");

  const EditCustomerFormClientContainer = useContext(
    EditCustomerFormClientContainerContext,
  );

  if (!EditCustomerFormClientContainer) {
    throw new Error(
      "EditCustomerModal must be used within a EditCustomerFormClientProvider",
    );
  }

  return (
    <FormBaseModal
      formId="edit-customer-form"
      title={t("title")}
      submitButtonLabel={t("submitButtonLabel")}
      form={
        <Suspense fallback={<CustomerFormBaseSkeleton />}>
          <EditCustomerFormClientContainer customerId={customerId} />
        </Suspense>
      }
      {...props}
    />
  );
}
