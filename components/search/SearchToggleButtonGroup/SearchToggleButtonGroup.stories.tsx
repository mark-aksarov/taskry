import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchToggleButtonGroup } from "./SearchToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/search/SearchToggleButtonGroup",
  component: SearchToggleButtonGroup,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SearchToggleButtonGroup>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    selectedKeys: ["users"],
  },
} satisfies Story;
