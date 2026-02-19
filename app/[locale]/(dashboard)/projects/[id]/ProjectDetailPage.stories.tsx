import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "@/components/projects/ProjectDetailAlt";
import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import {
  ProjectDetailAltStory,
  ProjectDetailAltWithoutSomeDataStory,
} from "@/components/projects/ProjectDetailAlt/__stories__";

import { mocked } from "storybook/test";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { SearchModal } from "@/components/search/SearchModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchModalStory } from "@/components/search/SearchModal/__stories__";
import { ProjectDetailActions } from "@/components/projects/ProjectDetailActions";
import { ProjectDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { ProjectDetailActionsStory } from "@/components/projects/ProjectDetailActions/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";

const meta = {
  title: "pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    PageDecorator,
    withDeleteCommentModalProvider,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof ProjectDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailContainer: (
      <ProjectDetailAlt {...ProjectDetailAltStory.args} />
    ),
    projectHeaderContainer: <DetailHeader {...ProjectDetailHeaderStory.args} />,
    projectDetailActions: (
      <ProjectDetailActions {...ProjectDetailActionsStory.args} />
    ),
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    projectHeaderContainer: <DetailHeaderSkeleton />,
    projectDetailActions: (
      <ProjectDetailActions {...ProjectDetailActionsStory.args} />
    ),
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    projectDetailContainer: (
      <ProjectDetailAlt {...ProjectDetailAltWithoutSomeDataStory.args} />
    ),
    projectHeaderContainer: <DetailHeaderSkeleton />,
    projectDetailActions: (
      <ProjectDetailActions {...ProjectDetailActionsStory.args} />
    ),
    searchModal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;
