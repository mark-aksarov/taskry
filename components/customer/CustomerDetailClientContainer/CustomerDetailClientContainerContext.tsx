"use client";

import { createContext } from "react";
import { CustomerDetailClientContainer as DefaultCustomerDetailClientContainer } from "./CustomerDetailClientContainer";

type CustomerDetailClientContainerType = React.ComponentType<{
  customerId: number;
}>;

export const CustomerDetailClientContainerContext =
  createContext<CustomerDetailClientContainerType>(
    DefaultCustomerDetailClientContainer,
  );
