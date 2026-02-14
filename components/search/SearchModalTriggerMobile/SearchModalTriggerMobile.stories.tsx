import { SearchModal } from "../SearchModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalStory } from "../SearchModal/__stories__";
import { SearchModalTriggerMobile } from "./SearchModalTriggerMobile";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchModalTriggerMobile",
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
