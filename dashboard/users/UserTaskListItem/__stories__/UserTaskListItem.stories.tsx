import { subDays } from "date-fns";
import { mockedTaskList } from "@/mocks/tasks";
import { UserTaskListItem } from "../UserTaskListItem";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { DeleteTaskProvider } from "@/dashboard/tasks/DeleteTaskContext";
import { UpdateTaskProvider } from "@/dashboard/tasks/UpdateTaskContext";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksContext";
import { SelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext";
import { UpdateTaskStatusProvider } from "@/dashboard/tasks/UpdateTaskStatusContext";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const mockedTask = mockedTaskList[0];

const meta = {
  title: "dashboard/users/UserTaskListItem",
  component: UserTaskListItem,
  render: (args) => (
    <DeadlineProvider deadline={args.deadline}>
      <UserTaskListItem {...args} />
    </DeadlineProvider>
  ),
  decorators: [
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <ViewModeProvider initialValue="list">
          <DeleteTasksProvider>
            <DeleteTaskProvider>
              <UpdateTaskProvider>
                <UpdateTaskStatusProvider>
                  <UpdateTaskStatusesProvider>
                    <Story />
                  </UpdateTaskStatusesProvider>
                </UpdateTaskStatusProvider>
              </UpdateTaskProvider>
            </DeleteTaskProvider>
          </DeleteTasksProvider>
        </ViewModeProvider>
      </SelectedTasksProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
  },
} satisfies Story;

export const WithOverdueDeadline = {
  args: {
    ...Default.args,
    deadline: subDays(new Date(), 3).toISOString(),
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a task title with a very long text for layout testing",
  },
};

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: "active",
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: "completed",
  },
} satisfies Story;
