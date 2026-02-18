import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "../ProjectDetailAlt";

import {
  ProjectDetailAltStory,
  ProjectDetailAltWithoutSomeDataStory,
} from "../ProjectDetailAlt/__stories__";

import { ProjectDetailCard } from "./ProjectDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailActions } from "../ProjectDetailActions";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { ProjectDetailActionsStory } from "@/components/projects/ProjectDetailActions/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [withDeleteCommentModalProvider, withThemedBackground],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetail: <ProjectDetailAlt {...ProjectDetailAltStory.args} />,
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
      <ProjectDetailAlt {...ProjectDetailAltWithoutSomeDataStory.args} />
    ),
  },
} satisfies Story;
