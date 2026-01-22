import { SearchModal } from "../SearchModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalTriggerDesktop } from "./SearchModalTriggerDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as SearchModalStory } from "../SearchModal/SearchModal.stories";

const meta = {
  title: "Components/search/SearchModalTriggerDesktop",
  component: SearchModalTriggerDesktop,
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchModalTriggerDesktop>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    modal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;
