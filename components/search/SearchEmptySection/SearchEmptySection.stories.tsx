import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchEmptySection } from "./SearchEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/comments/SearchEmptySection",
  component: SearchEmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof SearchEmptySection>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
