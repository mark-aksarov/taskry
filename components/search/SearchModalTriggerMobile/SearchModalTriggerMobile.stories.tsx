import { SearchModal } from "../SearchModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchEmptySection } from "../SearchEmptySection";
import { SearchModalTriggerMobile } from "./SearchModalTriggerMobile";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

const meta = {
  title: "Components/search/SearchModalTriggerMobile",
  component: SearchModalTriggerMobile,
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchModalTriggerMobile>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    modal: <SearchModal />,
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
    modal: <SearchModal />,
  },
  decorators: [
    (Story) => (
      <GlobalContainerProvider
        value={{
          NotificationModalContentContainer: () => <SearchEmptySection />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
