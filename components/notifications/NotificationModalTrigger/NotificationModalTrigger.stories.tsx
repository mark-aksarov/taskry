import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/notifications/NotificationModalTrigger",
  component: NotificationModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
