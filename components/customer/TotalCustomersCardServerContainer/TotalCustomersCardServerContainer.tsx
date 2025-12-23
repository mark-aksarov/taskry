import "server-only";

import { TotalCustomersCard } from "../TotalCustomersCard";
import { getCustomerCount } from "@/lib/data/customer/customer.dal";

export const TotalCustomersCardServerContainer = async () => {
  const totalCustomers = await getCustomerCount();

  return <TotalCustomersCard totalCustomers={totalCustomers} />;
};
