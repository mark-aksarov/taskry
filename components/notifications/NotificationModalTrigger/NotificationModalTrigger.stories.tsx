import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { NotificationModalContent } from "../NotificationModalContent";
import { Default as NotificationModalContentStory } from "../NotificationModalContent/NotificationModalContent.stories";

const meta = {
  title: "Components/notifications/NotificationModalTrigger",
  component: NotificationModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <NotificationModalContent {...NotificationModalContentStory.args} />
    ),
  },
} satisfies Story;
