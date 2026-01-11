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
import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { OverlayTriggerState } from "react-stately";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

export interface CustomerDetailBottomSheetProps {
  customerId: number;
  state: OverlayTriggerState;
}

export function CustomerDetailBottomSheet({
  customerId,
  state,
}: CustomerDetailBottomSheetProps) {
  const t = useTranslations("customers.CustomerDetailBottomSheet");

  const { CustomerDetailContainer } = useGlobalContainer();

  if (!CustomerDetailContainer) {
    throw new Error(
      "CustomerDetailContainer is missing in GlobalContainerContext",
    );
  }

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
    </BottomSheet>
  );
}
