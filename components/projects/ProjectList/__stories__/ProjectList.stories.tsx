import { ProjectList } from "../ProjectList";
import { mockedProjectList } from "@/mocks/projects";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectListItem } from "../../ProjectListItem";
import { ProjectListItemStory } from "../../ProjectListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedProjectProviders } from "../../ProjectProviders/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext/__stories__";

const meta = {
  title: "components/projects/ProjectList",
  component: ProjectList,
  decorators: [
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withViewModeProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectList.map((project) => (
      <MockedProjectProviders>
        <ProjectListItem
          key={project.id}
          {...ProjectListItemStory.args}
          {...project}
        />
      </MockedProjectProviders>
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
