import { SearchPagination } from "../SearchPagination";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withSearchProvider } from "../../SearchContext/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchPagination",
  component: SearchPagination,
  decorators: [withSearchProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SearchPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    totalCount: 30,
  },
} satisfies Story;
