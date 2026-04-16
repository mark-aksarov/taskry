import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";
import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";
import { withUpdateProjectTitleProvider } from "@/components/projects/UpdateProjectTitleProvider/__stories__";
import { withUpdateProjectStatusProvider } from "@/components/projects/UpdateProjectStatusProvider/__stories__";
import { withUpdateProjectDeadlineProvider } from "@/components/projects/UpdateProjectDeadlineProvider/__stories__";
import { withUpdateProjectCustomerProvider } from "@/components/projects/UpdateProjectCustomerProvider/__stories__";
import { withUpdateProjectStatusAltProvider } from "@/components/projects/UpdateProjectStatusAltProvider/__stories__";
import { withUpdateProjectDescriptionProvider } from "@/components/projects/UpdateProjectDescriptionProvider/__stories__";
import { withUpdateProjectCategoryRelProvider } from "@/components/projects/UpdateProjectCategoryRelProvider/__stories__";
import {
  ProjectDetailCardHeader,
  ProjectDetailCardHeaderSkeleton,
} from "./ProjectDetailCardHeader";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [
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
