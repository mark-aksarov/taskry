import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { UpdateProjectDescriptionModal } from "./UpdateProjectDescriptionModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateProjectDescriptionProvider } from "../UpdateProjectDescriptionContext";

const meta = {
  title: "dashboard/projects/UpdateProjectDescriptionModal",
  component: UpdateProjectDescriptionModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectDescriptionProvider>
        <Story />
      </UpdateProjectDescriptionProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateProjectDescription",
  },
} satisfies Meta<typeof UpdateProjectDescriptionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProject.id,
    description: mockedProject.description,
  },
} satisfies Story;
