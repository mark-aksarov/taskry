import {
  ProjectDetailFull,
  ProjectDetailFullSkeleton,
} from "@/components/projects/ProjectDetailFull";

import {
  DetailCardHeading,
  DetailCardHeadingSkeleton,
} from "@/components/common/DetailCard";

import {
  ProjectDetailForm,
  ProjectDetailFormSkeleton,
} from "@/components/projects/ProjectDetailForm";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { ProjectDetailPage } from "./ProjectDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailFullStory } from "@/components/projects/ProjectDetailFull/ProjectDetailFull.stories";
import { Default as ProjectDetailFormStory } from "@/components/projects/ProjectDetailForm/ProjectDetailForm.stories";

const meta = {
  title: "components/pages/ProjectDetailPage",
  component: ProjectDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/projects/1");
  },
} satisfies Meta<typeof ProjectDetailPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailCardHeadingContainer: (
      <DetailCardHeading>Design homepage layout</DetailCardHeading>
    ),
    projectDetailContainer: (
      <ProjectDetailFull {...ProjectDetailFullStory.args} />
    ),
    projectDetailFormContainer: (
      <ProjectDetailForm {...ProjectDetailFormStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    projectDetailCardHeadingContainer: <DetailCardHeadingSkeleton />,
    projectDetailContainer: <ProjectDetailFullSkeleton />,
    projectDetailFormContainer: <ProjectDetailFormSkeleton />,
  },
} satisfies Story;
