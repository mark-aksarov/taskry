import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "../ProjectDetailModal";
import { ProjectDetailStory } from "../../ProjectDetail/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectDetail, ProjectDetailSkeleton } from "../../ProjectDetail";

const meta = {
  title: "components/projects/ProjectDetailModal",
  component: ProjectDetailModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Project detail" />
        <Story />
      </DialogTrigger>
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
