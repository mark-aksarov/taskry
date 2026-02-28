import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import { mockedProjectDetail } from "@/mocks/projects";
import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailHeader } from "../ProjectDetailHeader";
import { ProjectDetailActions } from "../ProjectDetailActions";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { projectDetailActionsArgs } from "../ProjectDetailActions/__stories__";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const project = mockedProjectDetail;

export const Default = {
  args: {
    projectDetailContainer: <ProjectDetailAlt {...project} />,
    projectDetailHeaderContainer: (
      <ProjectDetailHeader
        projectTitle={project.title}
        categoryName={project.category.name}
      />
    ),
    projectDetailActions: (
      <ProjectDetailActions {...projectDetailActionsArgs} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    projectDetailHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalProjectData = {
  args: {
    projectDetailContainer: (
      <ProjectDetailAlt
        id={project.id}
        status={project.status}
        deadline={project.deadline}
      />
    ),
    projectDetailHeaderContainer: (
      <ProjectDetailHeader projectTitle={project.title} />
    ),
    projectDetailActions: (
      <ProjectDetailActions {...projectDetailActionsArgs} />
    ),
  },
} satisfies Story;
