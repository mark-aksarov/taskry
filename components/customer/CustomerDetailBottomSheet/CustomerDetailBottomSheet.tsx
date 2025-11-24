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
import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { CustomerDetailClientContainerContext } from "../CustomerDetailClientContainer";

export interface CustomerDetailBottomSheetProps {
  customerId: number;
  state: OverlayTriggerState;
}

export function CustomerDetailBottomSheet({
  customerId,
  state,
}: CustomerDetailBottomSheetProps) {
  const CustomerDetailClientContainer = useContext(
    CustomerDetailClientContainerContext,
  );

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>Customer Details</DialogHeading>
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
            <CustomerDetailClientContainer customerId={customerId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="primary"
            size="medium"
            label="Edit"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
