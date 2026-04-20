import { SearchList } from "../SearchList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchListExample } from "./SearchListExample";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/search/SearchList",
  component: SearchList,
  tags: ["!dev"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: null,
  },
  render: () => <SearchListExample />,
} satisfies Story;
