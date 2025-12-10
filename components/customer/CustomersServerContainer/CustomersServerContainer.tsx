import { CustomerList } from "../CustomerList";
import { CustomerGrid } from "../CustomerGrid";
import { CustomerListItem } from "../CustomerListItem";
import { CustomerGridItem } from "../CustomerGridItem";
import { Pagination } from "@/components/common/Pagination";
import { ViewModeLayout } from "@/components/common/ViewMode";
import { getUserWorkspaceId } from "@/lib/utils/getUserWorkspaceId";
import { getCustomerCount, getCustomerList } from "@/lib/queries/customers";

interface CustomersServerContainerProps {
  page: number;
  pageSize: number;
}

export async function CustomersServerContainer({
  page,
  pageSize,
}: CustomersServerContainerProps) {
  const workspaceId = await getUserWorkspaceId();
  const customers = await getCustomerList({ page, pageSize, workspaceId });
  const count = await getCustomerCount({ workspaceId });
  const totalPages = Math.ceil(count / pageSize);

  return (
    <>
      <ViewModeLayout
        list={
          <CustomerList>
            {customers.map((customer) => (
              <CustomerListItem
                key={customer.id}
                id={customer.id}
                fullName={customer.fullName}
                imageUrl={customer.imageUrl ?? undefined}
                email={customer.email}
                phoneNumber={customer.phoneNumber ?? undefined}
                publicLink={customer.publicLink ?? undefined}
                company={customer.company}
              />
            ))}
          </CustomerList>
        }
        grid={
          <CustomerGrid>
            {customers.map((customer) => (
              <CustomerGridItem
                key={customer.id}
                id={customer.id}
                fullName={customer.fullName}
                imageUrl={customer.imageUrl ?? undefined}
                email={customer.email}
                phoneNumber={customer.phoneNumber ?? undefined}
                publicLink={customer.publicLink ?? undefined}
                company={customer.company}
              />
            ))}
          </CustomerGrid>
        }
      />
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            baseUrl="/customers"
          />
        </div>
      )}
    </>
  );
}
