import { ProjectGridLarge } from "../ProjectGridLarge";
import { mockedProjectList } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemLarge } from "../../ProjectGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectGridItemLargeStory } from "../../ProjectGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext/__stories__";
import { withUpdateUserImageProvider } from "@/components/users/UpdateUserImageContext/__stories__";

const meta = {
  title: "components/projects/ProjectGridLarge",
  component: ProjectGridLarge,
  decorators: [
    withUpdateUserImageProvider,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withViewModeProvider,
    withGuestModeModalProvider,
    withCurrentUserProvider,
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectGridLarge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectList.map((project) => (
      <ProjectGridItemLarge
        key={project.id}
        {...ProjectGridItemLargeStory.args}
        {...project}
      />
    )),
  },
} satisfies Story;

export const GuestMode = {
  ...Default,
  parameters: {
    isGuest: true,
  },
} satisfies Story;
