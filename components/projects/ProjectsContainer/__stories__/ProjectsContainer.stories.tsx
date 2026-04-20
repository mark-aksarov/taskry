import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageGrid } from "@/components/common/PageGrid";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { ProjectsContainerPresentationExample } from "./ProjectsContainerPresentationExample";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesProvider/__stories__";

const meta = {
  title: "components/projects/ProjectsContainer",
  component: ProjectsContainerPresentationExample,
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
} satisfies Meta<typeof ProjectsContainerPresentationExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <PageGrid>
      <ProjectsContainerPresentationExample />
    </PageGrid>
  ),
} satisfies Story;
