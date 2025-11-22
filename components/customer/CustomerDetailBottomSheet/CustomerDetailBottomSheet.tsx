"use client";

import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
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
    <DetailBottomSheet state={state} title="Customer Details">
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
    </DetailBottomSheet>
  );
}
