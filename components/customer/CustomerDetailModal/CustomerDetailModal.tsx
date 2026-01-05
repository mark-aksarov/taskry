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

import { useTranslations } from "next-intl";
import { Suspense, useContext } from "react";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailContainerContext } from "../CustomerDetailContainer";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";

export function CustomerDetailModal({ customerId }: { customerId: number }) {
  const t = useTranslations("customers.CustomerDetailModal");

  const CustomerDetailContainer = useContext(CustomerDetailContainerContext);

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
              <div className="flex flex-col gap-6">
                <PersonHeaderSkeleton />
                <CustomerDetailSkeleton />
              </div>
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
