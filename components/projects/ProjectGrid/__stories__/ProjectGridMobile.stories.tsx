import { mockedProjectList } from "@/mocks/projects";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridMobile } from "../ProjectGridMobile";
import { ProjectGridItemMobile } from "../../ProjectGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectGridItemMobileStory } from "../../ProjectGridItem/__stories__";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsContext/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withGuestModeModalProvider } from "@/components/common/GuestModeModal/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesContext/__stories__";

const meta = {
  title: "components/projects/ProjectGridMobile",
  component: ProjectGridMobile,
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
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ProjectGridMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: mockedProjectList.map((project) => (
      <ProjectGridItemMobile
        key={project.id}
        {...ProjectGridItemMobileStory.args}
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
