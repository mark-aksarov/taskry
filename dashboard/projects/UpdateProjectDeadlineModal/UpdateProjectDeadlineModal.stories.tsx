import { withOpenModal } from "@/.storybook/withOpenModal";
import { mockedProjectDetail } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateProjectDeadlineModal } from "./UpdateProjectDeadlineModal";
import { UpdateProjectDeadlineProvider } from "../UpdateProjectDeadlineContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/UpdateProjectDeadlineModal",
  component: UpdateProjectDeadlineModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateProjectDeadlineProvider>
        <Story />
      </UpdateProjectDeadlineProvider>
    ),
    withDashboardLayoutProviders,
  ],

  parameters: {
    modalId: "updateProjectDeadline",
  },
} satisfies Meta<typeof UpdateProjectDeadlineModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: mockedProjectDetail.id,
    projectDeadline: mockedProjectDetail.deadline,
  },
} satisfies Story;
