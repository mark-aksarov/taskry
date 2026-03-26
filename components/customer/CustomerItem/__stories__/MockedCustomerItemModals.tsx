import { CustomerDetail } from "../../CustomerDetail";
import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerForm } from "../../UpdateCustomerForm";
import { CustomerDetailModal } from "../../CustomerDetailModal";
import { UpdateCustomerModal } from "../../UpdateCustomerModal";
import { DeleteCustomerModal } from "../../DeleteCustomerModal";
import { CustomerDetailHeader } from "../../CustomerDetailHeader";

export function MockedCustomerItemModals() {
  return (
    <>
      <CustomerDetailModal
        customerId={1}
        customerDetailContainer={<CustomerDetail {...mockedCustomerDetail} />}
        customerDetailHeaderContainer={
          <CustomerDetailHeader
            fullName={mockedCustomerDetail.fullName}
            imageUrl={mockedCustomerDetail.imageUrl}
            companyName={mockedCustomerDetail.company?.name}
          />
        }
      />

      <UpdateCustomerModal
        updateCustomerFormContainer={
          <UpdateCustomerForm
            {...mockedCustomerDetail}
            customerId={mockedCustomerDetail.id}
            companySelectItems={mockedCompanySummaries}
          />
        }
      />

      <DeleteCustomerModal
        customerId={mockedCustomerDetail.id}
        customerFullName={mockedCustomerDetail.fullName}
      />
    </>
  );
}
