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
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";
import { WithoutSomeData as ProjectDetailWithoutSomeDataStory } from "../ProjectDetail/ProjectDetail.stories";
import { ProjectDetailHeader as ProjectDetailHeaderStory } from "@/components/common/DetailHeader/DetailHeader.stories";

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
  },
} satisfies Story;

export const Loading = {
  args: {
    projectDetail: <ProjectDetailAltSkeleton />,
    projectDetailHeader: <DetailHeaderSkeleton />,
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
