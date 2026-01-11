import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotificationModalTrigger } from "./NotificationModalTrigger";
import { NotificationEmptySection } from "../NotificationEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

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

export const WithNotification = {
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
