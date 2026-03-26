import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerForm } from "../../UpdateCustomerForm";
import { UpdateCustomerModal } from "../../UpdateCustomerModal";
import { DeleteCustomerDetailModal } from "../../DeleteCustomerModal";

export function MockedCustomerDetailModals() {
  return (
    <>
      <UpdateCustomerModal
        updateCustomerFormContainer={
          <UpdateCustomerForm
            {...mockedCustomerDetail}
            customerId={mockedCustomerDetail.id}
            companySelectItems={mockedCompanySummaries}
          />
        }
      />

      <DeleteCustomerDetailModal
        customerId={mockedCustomerDetail.id}
        customerFullName={mockedCustomerDetail.fullName}
      />
    </>
  );
}
