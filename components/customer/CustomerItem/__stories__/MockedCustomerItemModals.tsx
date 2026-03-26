import { CustomerDetail } from "../../CustomerDetail";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerForm } from "../../UpdateCustomerForm";
import { CustomerDetailModal } from "../../CustomerDetailModal";
import { UpdateCustomerModal } from "../../UpdateCustomerModal";
import { DeleteCustomerModal } from "../../DeleteCustomerModal";
import { CustomerDetailHeader } from "../../CustomerDetailHeader";

interface MockedCustomerItemModalsProps {
  customer: {
    id: number;
    fullName: string;
    email: string;
    bio?: string;
    phoneNumber?: string;
    address?: string;
    publicLink?: string;
    imageUrl?: string;
    company?: {
      id: number;
      name: string;
    };
  };
}

export function MockedCustomerItemModals({
  customer,
}: MockedCustomerItemModalsProps) {
  return (
    <>
      <CustomerDetailModal
        customerId={1}
        customerDetailContainer={<CustomerDetail {...customer} />}
        customerDetailHeaderContainer={
          <CustomerDetailHeader
            fullName={customer.fullName}
            imageUrl={customer.imageUrl}
            companyName={customer.company?.name}
          />
        }
      />

      <UpdateCustomerModal
        updateCustomerFormContainer={
          <UpdateCustomerForm
            {...customer}
            customerId={customer.id}
            companySelectItems={mockedCompanySummaries}
          />
        }
      />

      <DeleteCustomerModal
        customerId={customer.id}
        customerFullName={customer.fullName}
      />
    </>
  );
}
