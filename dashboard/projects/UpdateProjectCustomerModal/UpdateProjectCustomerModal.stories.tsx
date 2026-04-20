import {
  UpdateProjectCustomerForm,
  UpdateProjectCustomerFormSkeleton,
} from "../UpdateProjectCustomerForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedCustomerSummaries } from "@/mocks/customers";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateProjectCustomerModal } from "./UpdateProjectCustomerModal";
import { withUpdateProjectCustomerProvider } from "../UpdateProjectCustomerProvider/__stories__";

const meta = {
  title: "components/projects/UpdateProjectCustomerModal",
  component: UpdateProjectCustomerModal,
  decorators: [
    withOpenModal,
    withUpdateProjectCustomerProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateProjectCustomer",
  },
} satisfies Meta<typeof UpdateProjectCustomerModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateProjectCustomerFormContainer: (
      <UpdateProjectCustomerForm
        projectId={mockedProject.id}
        customerId={mockedProject.customer.id}
        customerSelectItems={mockedCustomerSummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateProjectCustomerFormContainer: <UpdateProjectCustomerFormSkeleton />,
  },
} satisfies Story;
