import { subDays } from "date-fns";
import { mockedTaskList } from "@/mocks/tasks";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemMobile } from "../TaskGridItemMobile";
import { UpdateTaskProvider } from "../../UpdateTaskContext";
import { DeleteTaskProvider } from "../../DeleteTaskContext";
import { DeleteTasksProvider } from "../../DeleteTasksContext";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { SelectedTasksProvider } from "../../SelectedTasksContext";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
import { UpdateTaskStatusProvider } from "../../UpdateTaskStatusContext";
import { UpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskGridItemMobile",
  component: TaskGridItemMobile,
  render: (args) => (
    <DeadlineProvider deadline={args.deadline}>
      <TaskGridItemMobile {...args} />
    </DeadlineProvider>
  ),
  decorators: [
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <ViewModeProvider initialValue="grid">
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
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof TaskGridItemMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockedTask = mockedTaskList[0];

export const Default = {
  args: {
    ...mockedTask,
    subtasksTotal: mockedTask.subtasks.total,
    subtasksDone: mockedTask.subtasks.done,
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
    assignee: {
      ...Default.args.assignee!,
      fullName: "This is a user name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithoutAssignee = {
  args: {
    ...Default.args,
    assignee: undefined,
  },
} satisfies Story;

export const WithoutAssigneeImage = {
  args: {
    ...Default.args,
    assignee: {
      id: "user-3",
      fullName: "User 3",
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: TaskStatus.active,
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: TaskStatus.completed,
  },
} satisfies Story;
