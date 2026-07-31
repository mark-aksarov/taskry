import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskItemStatusBadge } from "./TaskItemStatusBadge";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { UpdateTaskStatusesProvider } from "../UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta: Meta<typeof TaskItemStatusBadge> = {
  title: "dashboard/tasks/TaskItemStatusBadge",
  component: TaskItemStatusBadge,
  decorators: [
    (Story) => (
      <UpdateTaskStatusesProvider>
        <UpdateTaskStatusProvider>
          <DeadlineProvider deadline={new Date().toString()} status="active">
            <Story />
          </DeadlineProvider>
        </UpdateTaskStatusProvider>
      </UpdateTaskStatusesProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof TaskItemStatusBadge>;

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
