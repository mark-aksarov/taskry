import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ModalPagination } from "../ModalPagination";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { fn } from "storybook/internal/test";

const meta = {
  title: "components/common/ModalPagination",
  component: ModalPagination,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ModalPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    page: 1,
    pageSize: 10,
    setPage: fn(),
    totalCount: 30,
    totalPages: 3,
  },
} satisfies Story;
