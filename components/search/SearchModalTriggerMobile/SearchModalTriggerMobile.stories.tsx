import { SearchModal } from "../SearchModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalTriggerMobile } from "./SearchModalTriggerMobile";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as SearchModalStory } from "../SearchModal/SearchModal.stories";

const meta = {
  title: "Components/search/SearchModalTriggerMobile",
  component: SearchModalTriggerMobile,
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchModalTriggerMobile>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    modal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;
