import { mockedTaskList } from "@/mocks/tasks";
import { TaskStatus } from "@/generated/prisma/enums";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemLarge } from "../TaskGridItemLarge";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { UpdateTaskProvider } from "../../UpdateTaskContext";
import { DeleteTaskProvider } from "../../DeleteTaskContext";
import { DeleteTasksProvider } from "../../DeleteTasksContext";
import { SelectedTasksProvider } from "../../SelectedTasksContext";
import { UpdateTaskStatusProvider } from "../../UpdateTaskStatusContext";
import { UpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskGridItemLarge",
  component: TaskGridItemLarge,
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
  parameters: {
    viewMode: "grid",
  },
} satisfies Meta<typeof TaskGridItemLarge>;

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
