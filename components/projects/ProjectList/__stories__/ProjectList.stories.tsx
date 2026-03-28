import { ProjectList } from "../ProjectList";
import { mockedProjectList } from "@/mocks/projects";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectListItem } from "../../ProjectListItem";
import { ProjectListItemStory } from "../../ProjectListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedProjectItemWrapper } from "../../ProjectItemWrapper/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesProvider/__stories__";

const meta = {
  title: "components/projects/ProjectList",
  component: ProjectList,
  decorators: [
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withViewModeProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectList.map((project) => (
      <MockedProjectItemWrapper>
        <ProjectListItem
          key={project.id}
          {...ProjectListItemStory.args}
          {...project}
        />
      </MockedProjectItemWrapper>
    )),
  },
} satisfies Story;
