import { SearchModal } from "../SearchModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchModalStory } from "../SearchModal/__stories__";
import { SearchModalTriggerDesktop } from "./SearchModalTriggerDesktop";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchModalTriggerDesktop",
  component: SearchModalTriggerDesktop,
  decorators: [
    (Story) => (
      <div className="flex">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof SearchModalTriggerDesktop>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    modal: <SearchModal {...SearchModalStory.args} />,
  },
} satisfies Story;
