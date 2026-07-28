import {
  UpdateProjectClientForm,
  UpdateProjectClientFormSkeleton,
} from "../UpdateProjectClientForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { UpdateProjectClientModal } from "./UpdateProjectClientModal";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { UpdateProjectClientProvider } from "../UpdateProjectClientContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/UpdateProjectClientModal",
  component: UpdateProjectClientModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectClientProvider>
        <Story />
      </UpdateProjectClientProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateProjectClient",
  },
} satisfies Meta<typeof UpdateProjectClientModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateProjectClientFormContainer: (
      <UpdateProjectClientForm
        projectId={mockedProject.id}
        clientId={mockedProject.client.id}
        clientSelectItems={mockedClientSummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateProjectClientFormContainer: <UpdateProjectClientFormSkeleton />,
  },
} satisfies Story;
