import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchToggleButtonGroup } from "../SearchToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchToggleButtonGroup",
  component: SearchToggleButtonGroup,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SearchToggleButtonGroup>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedKeys: ["tasks"],
  },
} satisfies Story;
