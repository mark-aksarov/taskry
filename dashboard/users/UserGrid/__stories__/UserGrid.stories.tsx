import { UserGridExample } from "./UserGridExample";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { DeleteTasksProvider } from "@/dashboard/tasks/DeleteTasksContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateTaskStatusesProvider } from "@/dashboard/tasks/UpdateTaskStatusesContext";

const meta = {
  title: "dashboard/users/UserGrid",
  component: UserGridExample,
  decorators: [
    (Story) => (
      <ViewModeProvider initialValue="grid">
        <DeleteTasksProvider>
          <UpdateTaskStatusesProvider>
            <Story />
          </UpdateTaskStatusesProvider>
        </DeleteTasksProvider>
      </ViewModeProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof UserGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <DashboardGrid>
      <UserGridExample />
    </DashboardGrid>
  ),
} satisfies Story;
