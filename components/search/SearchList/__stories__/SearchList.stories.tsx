import { SearchList } from "../SearchList";
import { SearchListItem } from "../../SearchListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchList",
  component: SearchList,
  tags: ["!dev"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <SearchListItem value="Search keyword 1" onPress={() => {}} />
        <SearchListItem value="Search keyword 2" onPress={() => {}} />
        <SearchListItem value="Search keyword 3" onPress={() => {}} />
        <SearchListItem value="Search keyword 4" onPress={() => {}} />
        <SearchListItem value="Search keyword 5" onPress={() => {}} />
        <SearchListItem value="Search keyword 6" onPress={() => {}} />
        <SearchListItem value="Search keyword 7" onPress={() => {}} />
        <SearchListItem value="Search keyword 8" onPress={() => {}} />
        <SearchListItem value="Search keyword 9" onPress={() => {}} />
        <SearchListItem value="Search keyword 10" onPress={() => {}} />
      </>
    ),
  },
} satisfies Story;
