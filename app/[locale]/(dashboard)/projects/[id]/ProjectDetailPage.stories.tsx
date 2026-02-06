import {
  ProjectDetailAlt,
  ProjectDetailAltSkeleton,
} from "@/components/projects/ProjectDetailAlt";

import {
  Default as ProjectDetailStory,
  WithoutSomeData as ProjectDetailWithoutSomeDataStory,
} from "@/components/projects/ProjectDetail/ProjectDetail.stories";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { ProjectDetailPage } from "./ProjectDetailPage";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetailHeader as ProjectDetailHeaderStory } from "@/components/common/DetailHeader/DetailHeader.stories";

const meta = {
  title: "components/pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
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
    projectDetailContainer: <ProjectDetailAlt {...ProjectDetailStory.args} />,
    projectHeaderContainer: <DetailHeader {...ProjectDetailHeaderStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    projectDetailContainer: <ProjectDetailAltSkeleton />,
    projectHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    projectDetailContainer: (
      <ProjectDetailAlt {...ProjectDetailWithoutSomeDataStory.args} />
    ),
    projectHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;
