"use client";

import { createContext } from "react";
import { CustomerDetailContainer as DefaultCustomerDetailContainer } from "./CustomerDetailContainer";

type CustomerDetailContainerType = React.ComponentType<{
  customerId: number;
}>;

export const CustomerDetailContainerContext =
  createContext<CustomerDetailContainerType>(DefaultCustomerDetailContainer);
