import "server-only";

import {
  TotalCustomersCard,
  TotalCustomersCardSkeleton,
} from "./TotalCustomersCard";
import { Suspense } from "react";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";

export const TotalCustomersCardContainer = () => {
  return (
    <Suspense fallback={<TotalCustomersCardSkeleton />}>
      <TotalCustomersCardContainerInner />
    </Suspense>
  );
};

const TotalCustomersCardContainerInner = async () => {
  const totalCustomers = await getCustomerCount();

  return <TotalCustomersCard totalCustomers={totalCustomers} />;
};
