"use client";

import {
  Modal,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

export function CustomerDetailModal({ customerId }: { customerId: number }) {
  const t = useTranslations("customers.CustomerDetailModal");

  const { CustomerDetailContainer } = useGlobalContainer();

  if (!CustomerDetailContainer) {
    throw new Error(
      "CustomerDetailContainer is missing in GlobalContainerContext",
    );
  }

  return (
    <Modal isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
          <Suspense
            fallback={
              <PersonDetailPresentation
                personHeader={<PersonHeaderSkeleton />}
                userDetail={<CustomerDetailSkeleton />}
              />
            }
          >
            <CustomerDetailContainer customerId={customerId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label={t("editButtonLabel")}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
