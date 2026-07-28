import { mockedTaskList } from "@/mocks/tasks";
import { TaskListItem } from "../TaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskProvider } from "../../UpdateTaskContext";
import { DeleteTaskProvider } from "../../DeleteTaskContext";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeleteTasksProvider } from "../../DeleteTasksContext";
import { SelectedTasksProvider } from "../../SelectedTasksContext";
import { UpdateTaskStatusProvider } from "../../UpdateTaskStatusContext";
import { UpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const mockedTask = mockedTaskList[0];

const meta = {
  title: "dashboard/tasks/TaskListItem",
  component: TaskListItem,
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
} satisfies Meta<typeof TaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedTask,
    showCheckbox: false,
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
    project: {
      ...Default.args.project,
      title: "This is a project title with a very long text for layout testing",
    },
    category: {
      ...Default.args.category,
      name: "This is a category name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithCheckbox = {
  args: {
    ...Default.args,
    showCheckbox: true,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    assignee: undefined,
    project: undefined,
    category: undefined,
  },
} satisfies Story;

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
