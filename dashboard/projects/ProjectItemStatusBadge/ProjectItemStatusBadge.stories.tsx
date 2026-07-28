import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectItemStatusBadge } from "./ProjectItemStatusBadge";
import { UpdateProjectStatusProvider } from "../UpdateProjectStatusContext";
import { UpdateProjectStatusesProvider } from "../UpdateProjectStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta: Meta<typeof ProjectItemStatusBadge> = {
  title: "dashboard/projects/ProjectItemStatusBadge",
  component: ProjectItemStatusBadge,
  decorators: [
    (Story) => (
      <UpdateProjectStatusProvider>
        <UpdateProjectStatusesProvider>
          <Story />
        </UpdateProjectStatusesProvider>
      </UpdateProjectStatusProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof ProjectItemStatusBadge>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Pending = {
  args: {
    status: "pending",
  },
} satisfies Story;

export const Active = {
  args: {
    status: "active",
  },
} satisfies Story;

export const Done = {
  args: {
    status: "completed",
  },
} satisfies Story;
