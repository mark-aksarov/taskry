import { mockedProjectList } from "@/mocks/projects";
import { ProjectStatus } from "@/generated/prisma/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItemMobile } from "../ProjectGridItemMobile";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withViewModeProvider } from "@/components/common/ViewMode/__stories__";
import { withUpdateProjectProvider } from "../../UpdateProjectProvider/__stories__";
import { withDeleteProjectProvider } from "../../DeleteProjectProvider/__stories__";
import { withDeleteProjectsProvider } from "../../DeleteProjectsProvider/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withUpdateProjectStatusProvider } from "../../UpdateProjectStatusProvider/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusesProvider/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

const mockedProject = mockedProjectList[0];

const meta = {
  title: "components/projects/ProjectGridItemMobile",
  component: ProjectGridItemMobile,
  decorators: [
    withUpdateProjectStatusProvider,
    withUpdateProjectProvider,
    withDeleteProjectProvider,
    withDeleteProjectsProvider,
    withUpdateProjectStatusesProvider,
    withCurrentUserProvider,
    withSelectedProjectsProvider,
    withViewModeProvider,
    withPageTransitionProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof ProjectGridItemMobile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    ...mockedProject,
  },
} satisfies Story;

export const WithOverflowContent = {
  args: {
    ...Default.args,
    title: "This is a project title with a very long text for layout testing",
    creator: {
      ...Default.args.creator,
      fullName: "This is a user name with a very long text for layout testing",
    },
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    ...Default.args,
    creator: undefined,
  },
} satisfies Story;

export const WithoutCreatorImage = {
  args: {
    ...Default.args,
    creator: {
      id: "user1",
      fullName: "Alice Smith",
      imageUrl: undefined,
    },
  },
} satisfies Story;

export const WithActiveStatus = {
  args: {
    ...Default.args,
    status: ProjectStatus.active,
  },
} satisfies Story;

export const WithCompletedStatus = {
  args: {
    ...Default.args,
    status: ProjectStatus.completed,
  },
} satisfies Story;
