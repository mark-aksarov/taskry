import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerDetail } from "@/mocks/customers";
import { mockedCompanySummaries } from "@/mocks/companies";
import { UpdateCustomerForm } from "../UpdateCustomerForm";
import { UpdateCustomerModal } from "./UpdateCustomerModal";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateCustomerProvider } from "../UpdateCustomerProvider/__stories__";

const meta = {
  title: "dashboard/customers/UpdateCustomerModal",
  component: UpdateCustomerModal,
  decorators: [
    withOpenModal,
    withUpdateCustomerProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "updateCustomer",
  },
} satisfies Meta<typeof UpdateCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateCustomerFormContainer: (
      <UpdateCustomerForm
        {...mockedCustomerDetail}
        customerId={mockedCustomerDetail.id}
        companySelectItems={mockedCompanySummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    updateCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
