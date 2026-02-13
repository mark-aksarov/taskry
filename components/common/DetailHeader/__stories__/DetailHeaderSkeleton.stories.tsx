import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailHeaderSkeleton } from "../DetailHeaderSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/common/DetailHeaderSkeleton",
  component: DetailHeaderSkeleton,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof DetailHeaderSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
