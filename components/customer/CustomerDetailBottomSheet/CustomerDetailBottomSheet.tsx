"use client";

import {
  Button,
  Dialog,
  DialogBody,
  BottomSheet,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { useTranslations } from "next-intl";
import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailContainerContext } from "../CustomerDetailContainer";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";

export interface CustomerDetailBottomSheetProps {
  customerId: number;
  state: OverlayTriggerState;
}

export function CustomerDetailBottomSheet({
  customerId,
  state,
}: CustomerDetailBottomSheetProps) {
  const t = useTranslations("customers.CustomerDetailBottomSheet");

  const CustomerDetailContainer = useContext(CustomerDetailContainerContext);

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
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
    </BottomSheet>
  );
}
