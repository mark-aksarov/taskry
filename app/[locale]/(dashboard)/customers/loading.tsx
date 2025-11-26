import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { CustomerListItemSkeleton } from "@/components/customer/CustomerListItem";

export default function CustomersPageLoading() {
  return (
    <PageListSkeleton
      title="All Customers"
      renderItemSkeleton={() => <CustomerListItemSkeleton />}
    />
  );
}
