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

import { Suspense, useContext } from "react";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { CustomerDetailClientContainerContext } from "../CustomerDetailClientContainer";

export function CustomerDetailModal({ customerId }: { customerId: number }) {
  const CustomerDetailClientContainer = useContext(
    CustomerDetailClientContainerContext,
  );

  return (
    <Modal isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
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
    </Modal>
  );
}
