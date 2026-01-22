import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { NotificationEmptySection } from "../NotificationEmptySection";
import { NotificationModalContent } from "../NotificationModalContent";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NotificationModalContentSkeleton } from "../NotificationModalContent/NotificationModalContentSkeleton";
import { Default as NotificationModalContentStory } from "../NotificationModalContent/NotificationModalContent.stories";

const meta = {
  title: "Components/notifications/NotificationModalTrigger",
  component: NotificationModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    notificationModalContentContainer: (
      <NotificationModalContent {...NotificationModalContentStory.args} />
    ),
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
    notificationModalContentContainer: <NotificationEmptySection />,
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    notificationModalContentContainer: <NotificationModalContentSkeleton />,
  },
} satisfies Story;
