import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationEmptySection } from "./NotificationEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/comments/NotificationEmptySection",
  component: NotificationEmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof NotificationEmptySection>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
