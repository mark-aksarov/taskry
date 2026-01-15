import { SearchModal } from "../SearchModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchEmptySection } from "../SearchEmptySection";
import { SearchModalTriggerDesktop } from "./SearchModalTriggerDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { GlobalContainerProvider } from "@/components/layout/GlobalContainerContext";

const meta = {
  title: "Components/search/SearchModalTriggerDesktop",
  component: SearchModalTriggerDesktop,
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchModalTriggerDesktop>;

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
          UsersSearchContainer: () => <SearchEmptySection />,
        }}
      >
        <Story />
      </GlobalContainerProvider>
    ),
  ],
} satisfies Story;
