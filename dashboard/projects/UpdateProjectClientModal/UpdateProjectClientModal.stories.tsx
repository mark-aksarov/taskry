import {
  UpdateProjectClientForm,
  UpdateProjectClientFormSkeleton,
} from "../UpdateProjectClientForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedClientSummaries } from "@/mocks/clients";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateProjectClientModal } from "./UpdateProjectClientModal";
import { withUpdateProjectClientProvider } from "../UpdateProjectClientProvider/__stories__";

const meta = {
  title: "dashboard/projects/UpdateProjectClientModal",
  component: UpdateProjectClientModal,
  decorators: [
    withOpenModal,
    withUpdateProjectClientProvider,
    withModalManagerProvider,
    withThemedBackground,
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
