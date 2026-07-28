import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridExample } from "./ProjectGridExample";
import { ViewModeProvider } from "@/dashboard/common/ViewMode";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { DeleteProjectsProvider } from "../../DeleteProjectsContext";
import { SelectedProjectsProvider } from "../../SelectedProjectsContext";
import { UpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/projects/ProjectGrid",
  component: ProjectGridExample,
  decorators: [
    (Story) => (
      <SelectedProjectsProvider pageItems={[]}>
        <ViewModeProvider initialValue="grid">
          <DeleteProjectsProvider>
            <UpdateProjectStatusesProvider>
              <Story />
            </UpdateProjectStatusesProvider>
          </DeleteProjectsProvider>
        </ViewModeProvider>
      </SelectedProjectsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof ProjectGridExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <DashboardGrid>
      <ProjectGridExample />
    </DashboardGrid>
  ),
} satisfies Story;
