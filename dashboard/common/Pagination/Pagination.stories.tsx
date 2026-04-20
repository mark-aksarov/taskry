import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pagination } from "./Pagination";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/common/Pagination",
  component: Pagination,
  decorators: [withThemedBackground],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small = {
  args: {
    page: 1,
    totalPages: 10,
    onChange: () => {},
  },
} satisfies Story;

export const Large = {
  args: {
    page: 1,
    totalPages: 10,
    size: "large",
    onChange: () => {},
  },
} satisfies Story;
