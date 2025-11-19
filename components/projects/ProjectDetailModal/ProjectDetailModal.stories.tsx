import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { Button, RACDialogTrigger } from "@/components/ui";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import {
  withProjectDetail,
  withProjectDetailSkeleton,
} from "../ProjectDetailClientContainer/decorators";

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
  args: {
    projectId: 1,
  },
} satisfies Meta<typeof ProjectDetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  decorators: [withProjectDetail],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [withProjectDetailSkeleton],
} satisfies Story;
