import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerCompanyForm } from "../UpdateCustomerCompanyForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateCustomerCompanyModal } from "./UpdateCustomerCompanyModal";
import { withUpdateCustomerCompanyProvider } from "../UpdateCustomerCompanyProvider/__stories__";

const meta = {
  title: "components/customers/UpdateCustomerCompanyModal",
  component: UpdateCustomerCompanyModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerCompanyProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomerCompany",
  },
} satisfies Meta<typeof UpdateCustomerCompanyModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateCustomerCompanyFormContainer: (
      <UpdateCustomerCompanyForm
        customerId={mockedCustomerDetail.id}
        companyId={mockedCustomerDetail.company.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;
