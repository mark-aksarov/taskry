import { EditCustomerForm } from "../../EditCustomerForm";
import { editCustomerFormArgs } from "../../EditCustomerForm/__stories__";

export const customerDetailActionsArgs = {
  guestMode: false,
  customerId: 1,
  customerFullName: "John Doe",
  deleteCustomer: () => ({ status: "success" as const }),
  editCustomerFormContainer: <EditCustomerForm {...editCustomerFormArgs} />,
};
