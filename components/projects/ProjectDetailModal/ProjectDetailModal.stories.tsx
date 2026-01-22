import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { ProjectDetail, ProjectDetailSkeleton } from "../ProjectDetail";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectDetailStory } from "../ProjectDetail/ProjectDetail.stories";

const meta = {
  title: "components/projects/ProjectDetailModal",
  component: ProjectDetailModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="Project detail" />
        <Story />
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    projectId: 1,
    projectDetailContainer: <ProjectDetail {...ProjectDetailStory.args} />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    projectId: 1,
    projectDetailContainer: <ProjectDetailSkeleton />,
  },
} satisfies Story;
