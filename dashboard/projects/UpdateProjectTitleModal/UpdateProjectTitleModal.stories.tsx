import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectTitleModal } from "./UpdateProjectTitleModal";
import { mockedProjectDetail as mockedProject } from "@/mocks/projects";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateProjectTitleProvider } from "../UpdateProjectTitleContext";

const meta = {
  title: "dashboard/projects/UpdateProjectTitleModal",
  component: UpdateProjectTitleModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectTitleProvider>
        <Story />
      </UpdateProjectTitleProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateProjectTitle",
  },
} satisfies Meta<typeof UpdateProjectTitleModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProject.id,
    title: mockedProject.title,
  },
} satisfies Story;
