"use client";

import { CustomerSearchListItem } from "./CustomerSearchListItem";
import { CustomerSearchItemDTO } from "@/lib/data/customer/customer.dto";
import { SearchContainer, SearchContainerProps } from "./SearchContainer";

type CustomersSearchContainerProps = Omit<
  SearchContainerProps<CustomerSearchItemDTO>,
  "endpoint" | "renderItem"
>;

export function CustomersSearchContainer(props: CustomersSearchContainerProps) {
  return (
    <SearchContainer
      endpoint="/api/customers/search"
      renderItem={(item: CustomerSearchItemDTO) => (
        <CustomerSearchListItem
          key={item.id}
          id={item.id}
          fullName={item.fullName}
          email={item.email}
        />
      )}
      {...props}
    />
  );
}
