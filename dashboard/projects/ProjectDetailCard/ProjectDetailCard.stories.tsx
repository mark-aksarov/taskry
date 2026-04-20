import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import {
  ProjectDetailCardHeader,
  ProjectDetailCardHeaderSkeleton,
} from "./ProjectDetailCardHeader";

import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectProvider } from "../DeleteProjectProvider/__stories__";
import { withCurrentUserProvider } from "@/dashboard/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/dashboard/common/ModalManagerContext/__stories__";
import { withUpdateProjectTitleProvider } from "@/dashboard/projects/UpdateProjectTitleProvider/__stories__";
import { withUpdateProjectStatusProvider } from "@/dashboard/projects/UpdateProjectStatusProvider/__stories__";
import { withUpdateProjectDeadlineProvider } from "@/dashboard/projects/UpdateProjectDeadlineProvider/__stories__";
import { withUpdateProjectCustomerProvider } from "@/dashboard/projects/UpdateProjectCustomerProvider/__stories__";
import { withUpdateProjectStatusAltProvider } from "@/dashboard/projects/UpdateProjectStatusAltProvider/__stories__";
import { withUpdateProjectDescriptionProvider } from "@/dashboard/projects/UpdateProjectDescriptionProvider/__stories__";
import { withUpdateProjectCategoryRelProvider } from "@/dashboard/projects/UpdateProjectCategoryRelProvider/__stories__";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [
    withDeleteProjectProvider,
    withCurrentUserProvider,
    withUpdateProjectCustomerProvider,
    withUpdateProjectDeadlineProvider,
    withUpdateProjectCategoryRelProvider,
    withUpdateProjectStatusAltProvider,
    withUpdateProjectTitleProvider,
    withUpdateProjectDescriptionProvider,
    withUpdateProjectStatusProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailCardHeaderContainer: (
      <ProjectDetailCardHeader
        projectStatus={mockedProjectDetail.status}
        projectDeadline={mockedProjectDetail.deadline}
      />
    ),
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    projectDetailCardHeaderContainer: <ProjectDetailCardHeaderSkeleton />,
    projectDetailContainer: <ProjectDetailAltSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalProjectData = {
  args: {
    ...Default.args,
    projectDetailContainer: (
      <ProjectDetailAlt
        title={mockedProjectDetail.title}
        deadline={mockedProjectDetail.deadline}
        status={mockedProjectDetail.status}
        tasks={mockedProjectDetail.tasks}
      />
    ),
  },
} satisfies Story;
