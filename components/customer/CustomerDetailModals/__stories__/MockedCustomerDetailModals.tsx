import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerForm } from "../../UpdateCustomerForm";
import { UpdateCustomerModal } from "../../UpdateCustomerModal";
import { DeleteCustomerModal } from "../../DeleteCustomerModal";

interface MockedCustomerDetailModalsProps {
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

export function MockedCustomerDetailModals({
  customer,
}: MockedCustomerDetailModalsProps) {
  return (
    <>
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
