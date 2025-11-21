import { ProjectDetailCard } from "./ProjectDetailCard";
import {
  ProjectDetailForm,
  ProjectDetailFormSkeleton,
} from "../ProjectDetailForm";
import {
  ProjectDetailFull,
  ProjectDetailFullSkeleton,
} from "../ProjectDetailFull";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DetailCardHeading,
  DetailCardHeadingSkeleton,
} from "@/components/common/DetailCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailFormStory } from "../ProjectDetailForm/ProjectDetailForm.stories";
import { Default as ProjectDetailFullStory } from "../ProjectDetailFull/ProjectDetailFull.stories";

const meta = {
  title: "Components/projects/ProjectDetailCard",
  component: ProjectDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectDetailCardHeading: (
      <DetailCardHeading>Design homepage layout</DetailCardHeading>
    ),
    projectDetail: <ProjectDetailFull {...ProjectDetailFullStory.args} />,
    projectDetailForm: <ProjectDetailForm {...ProjectDetailFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    projectDetailCardHeading: <DetailCardHeadingSkeleton />,
    projectDetail: <ProjectDetailFullSkeleton />,
    projectDetailForm: <ProjectDetailFormSkeleton />,
  },
} satisfies Story;
