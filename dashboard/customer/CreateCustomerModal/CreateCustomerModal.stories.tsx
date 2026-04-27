import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCompanySummaries } from "@/mocks/companies";
import { CreateCustomerModal } from "./CreateCustomerModal";
import { CreateCustomerForm } from "../CreateCustomerForm";
import { CustomerFormSkeleton } from "../CustomerFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCreateCustomerProvider } from "../CreateCustomerProvider/__stories__";

const meta = {
  title: "dashboard/customers/CreateCustomerModal",
  component: CreateCustomerModal,
  decorators: [
    withOpenModal,
    withCreateCustomerProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],

  parameters: {
    modalId: "createCustomer",
  },
} satisfies Meta<typeof CreateCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createCustomerFormContainer: (
      <CreateCustomerForm companySelectItems={mockedCompanySummaries} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createCustomerFormContainer: <CustomerFormSkeleton />,
  },
} satisfies Story;
