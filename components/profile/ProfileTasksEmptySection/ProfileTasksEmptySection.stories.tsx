import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileTasksEmptySection } from "./ProfileTasksEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/profile/ProfileTasksEmptySection",
  component: ProfileTasksEmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof ProfileTasksEmptySection>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
