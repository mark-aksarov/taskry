import {
  TasksSearchListStory,
  ProjectsSearchListStory,
} from "../../SearchList/__stories__";

import { fn } from "storybook/test";
import { SearchList } from "../../SearchList";
import { SearchField } from "../../SearchField";
import { Meta, StoryObj } from "@storybook/react";
import { SearchPagination } from "../../SearchPagination";
import { SearchPresentation } from "../SearchPresentation";
import { withSearchProvider } from "../../SearchContext/__stories__";
import { SearchToggleButtonGroup } from "../../SearchToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchPresentation",
  component: SearchPresentation,
  decorators: [withSearchProvider, withThemedBackground],
} satisfies Meta<typeof SearchPresentation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TasksSearchPresentation = {
  args: {
    searchField: <SearchField value="" onChange={fn()} />,
    searchToggleButtonGroup: (
      <SearchToggleButtonGroup selectedKeys={["tasks"]} />
    ),
    searchResult: <SearchList {...TasksSearchListStory.args} />,
    searchPagination: <SearchPagination totalCount={30} />,
  },
} satisfies Story;

export const ProjectsSearchPresentation = {
  args: {
    searchField: <SearchField value="" onChange={fn()} />,
    searchToggleButtonGroup: (
      <SearchToggleButtonGroup selectedKeys={["projects"]} />
    ),
    searchResult: <SearchList {...ProjectsSearchListStory.args} />,
    searchPagination: <SearchPagination totalCount={30} />,
  },
} satisfies Story;
