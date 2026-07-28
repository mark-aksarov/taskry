import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTaskListExample } from "./UserTaskListExample";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksContext";
import { SelectedTasksProvider } from "@/dashboard/tasks/SelectedTasksContext";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/users/UserTaskList",
  component: UserTaskListExample,
  decorators: [
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <ViewModeProvider initialValue="list">
          <DeleteTasksProvider>
            <UpdateTaskStatusesProvider>
              <Story />
            </UpdateTaskStatusesProvider>
          </DeleteTasksProvider>
        </ViewModeProvider>
      </SelectedTasksProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UserTaskListExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <UserTaskListExample />,
} satisfies Story;
