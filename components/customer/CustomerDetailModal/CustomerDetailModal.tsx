"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { CustomerDetailSkeleton } from "@/components/customer/CustomerDetail";
import { CustomerDetailClientContainerContext } from "../CustomerDetailClientContainer";

export function CustomerDetailModal({ customerId }: { customerId: number }) {
  const CustomerDetailClientContainer = useContext(
    CustomerDetailClientContainerContext,
  );

  return (
    <DetailModal title="Customer Details">
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
    </DetailModal>
  );
}
