"use client";

import dynamic from "next/dynamic";
import { CustomerListSkeleton } from "./CustomerList";
import { CustomerGridMobileSkeleton } from "./CustomerGrid";
import { CustomerListItemDTO } from "@/lib/data/customer/customer.dto";

const CustomersDynamic = dynamic(
  () => import("./CustomersDynamic").then((mod) => mod.CustomersDynamic),
  {
    ssr: false,
    loading: () => (
      <>
        <CustomerListSkeleton className="max-md:hidden" items={10} />
        <CustomerGridMobileSkeleton className="md:hidden" items={10} />
      </>
    ),
  },
);

export interface CustomersContainerProps {
  customers: CustomerListItemDTO[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export function CustomersContainer({
  customers,
  totalCount,
  page,
  pageSize,
}: CustomersContainerProps) {
  return (
    <CustomersDynamic
      page={page}
      pageSize={pageSize}
      customers={customers}
      totalPages={Math.ceil(totalCount / pageSize)}
    />
  );
}
