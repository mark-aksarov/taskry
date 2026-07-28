import { SearchList } from "../SearchList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchListExample } from "./SearchListExample";

const meta = {
  title: "dashboard/search/SearchList",
  component: SearchList,
  tags: ["!dev"],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: null,
  },
  render: () => <SearchListExample />,
} satisfies Story;
