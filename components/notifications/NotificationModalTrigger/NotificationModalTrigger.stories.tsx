import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { NotificationEmptySection } from "../NotificationEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";
import { NotificationModalContentSkeleton } from "../NotificationModalContent/NotificationModalContentSkeleton";

const meta = {
  title: "Components/notifications/NotificationModalTrigger",
  component: NotificationModalTrigger,
  decorators: [withThemedBackground],
} satisfies Meta<typeof NotificationModalTrigger>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;

export const WithEmptySection = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          NotificationModalContentContainer: () => <NotificationEmptySection />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;

export const WithSkeletonContent = {
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          NotificationModalContentContainer: () => (
            <NotificationModalContentSkeleton />
          ),
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
