import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailActions } from "../ProjectDetailActions";
import { ProjectDetailStory } from "../ProjectDetail/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailWithoutSomeDataStory } from "../ProjectDetail/__stories__";
import { ProjectDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { ProjectDetailActionsStory } from "@/components/projects/ProjectDetailActions/__stories__";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetail: <ProjectDetailAlt {...ProjectDetailStory.args} />,
    projectDetailHeader: <DetailHeader {...ProjectDetailHeaderStory.args} />,
    projectDetailActions: (
      <ProjectDetailActions {...ProjectDetailActionsStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    projectDetail: <ProjectDetailAltSkeleton />,
    projectDetailHeader: <DetailHeaderSkeleton />,
    projectDetailActions: (
      <ProjectDetailActions {...ProjectDetailActionsStory.args} />
    ),
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    projectDetail: (
      <ProjectDetailAlt {...ProjectDetailWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
