import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withSearchProvider } from "../../SearchContext/__stories__";
import { SearchPaginationSkeleton } from "../SearchPaginationSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchPaginationSkeleton",
  component: SearchPaginationSkeleton,
  decorators: [withSearchProvider, withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SearchPaginationSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
