import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PersonHeaderSkeleton } from "./PersonHeaderSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/PersonHeaderSkeleton",
  component: PersonHeaderSkeleton,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof PersonHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
