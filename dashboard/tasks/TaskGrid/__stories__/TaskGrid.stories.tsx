import { TaskGridExample } from "./TaskGridExample";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DeleteTasksProvider } from "../../DeleteTasksContext";
import { SelectedTasksProvider } from "../../SelectedTasksContext";
import { UpdateTaskStatusesProvider } from "../../UpdateTaskStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskGrid",
  component: TaskGridExample,
  decorators: [
    (Story) => (
      <SelectedTasksProvider pageItems={[]}>
        <ViewModeProvider initialValue="grid">
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
} satisfies Meta<typeof TaskGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: (args) => (
    <DashboardGrid>
      <TaskGridExample {...args} />
    </DashboardGrid>
  ),
  args: {
    showCheckbox: true,
  },
} satisfies Story;
