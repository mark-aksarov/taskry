import { withOpenModal } from "@/.storybook/withOpenModal";
import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectStatusModal } from "./UpdateProjectStatusModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateProjectStatusAltProvider } from "../UpdateProjectStatusAltContext";

const meta = {
  title: "dashboard/projects/UpdateProjectStatusModal",
  component: UpdateProjectStatusModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectStatusAltProvider>
        <Story />
      </UpdateProjectStatusAltProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateProjectStatus",
  },
} satisfies Meta<typeof UpdateProjectStatusModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProjectDetail.id,
    projectStatus: mockedProjectDetail.status,
  },
} satisfies Story;
