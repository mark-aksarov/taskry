import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import {
  ProjectDetailActions,
  ProjectDetailActionsSkeleton,
} from "../ProjectDetailActions";

import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailHeader } from "../ProjectDetailHeader";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectProvider } from "../DeleteProjectProvider/__stories__";
import { withUpdateProjectProvider } from "../UpdateProjectProvider/__stories__";
import { withCurrentUserProvider } from "@/components/common/CurrentUserContext/__stories__";
import { withModalManagerProvider } from "@/components/common/ModalManagerContext/__stories__";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [
    withUpdateProjectProvider,
    withDeleteProjectProvider,
    withCurrentUserProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailContainer: <ProjectDetailAlt {...mockedProjectDetail} />,
    projectDetailHeaderContainer: (
      <ProjectDetailHeader
        projectTitle={mockedProjectDetail.title}
        categoryName={mockedProjectDetail.category.name}
      />
    ),
    projectDetailActions: <ProjectDetailActions />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    projectDetailHeaderContainer: <DetailHeaderSkeleton />,
    projectDetailActions: <ProjectDetailActionsSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalProjectData = {
  args: {
    projectDetailContainer: (
      <ProjectDetailAlt
        status={mockedProjectDetail.status}
        deadline={mockedProjectDetail.deadline}
      />
    ),
    projectDetailHeaderContainer: (
      <ProjectDetailHeader projectTitle={mockedProjectDetail.title} />
    ),
    projectDetailActions: Default.args.projectDetailActions,
  },
} satisfies Story;
