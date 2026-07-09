import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridExample } from "./ProjectGridExample";
import { DashboardGrid } from "@/dashboard/common/DashboardGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/dashboard/common/ViewMode/__stories__";
import { withCurrentUserProvider } from "@/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/common/ModalManagerContext/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withPageTransitionProvider } from "@/dashboard/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesProvider/__stories__";

const meta = {
  title: "dashboard/projects/ProjectGrid",
  component: ProjectGridExample,
  decorators: [
    withUpdateProjectStatusesProvider,
    withDeleteProjectsProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
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
