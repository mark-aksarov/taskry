import { fn } from "storybook/test";
import { SearchList } from "../../SearchList";
import { SearchField } from "../../SearchField";
import { Meta, StoryObj } from "@storybook/react";
import { mockedTaskSearchList } from "@/mocks/tasks";
import { SearchPagination } from "../../SearchPagination";
import { SearchPresentation } from "../SearchPresentation";
import { mockedProjectSearchList } from "@/mocks/projects";
import { TaskSearchListItem } from "../../TaskSearchListItem";
import { ProjectSearchListItem } from "../../ProjectSearchListItem";
import { withSearchProvider } from "../../SearchContext/__stories__";
import { SearchToggleButtonGroup } from "../../SearchToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchPresentation",
  component: SearchPresentation,
  tags: ["!dev"],
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
    searchResult: (
      <SearchList>
        {mockedTaskSearchList.map((task) => (
          <TaskSearchListItem
            key={task.id}
            {...task}
            deadline={new Date(task.deadline)}
          />
        ))}
      </SearchList>
    ),
    searchPagination: <SearchPagination totalCount={30} />,
  },
} satisfies Story;

export const ProjectsSearchPresentation = {
  args: {
    searchField: <SearchField value="" onChange={fn()} />,
    searchToggleButtonGroup: (
      <SearchToggleButtonGroup selectedKeys={["projects"]} />
    ),
    searchResult: (
      <SearchList>
        {mockedProjectSearchList.map((project) => (
          <ProjectSearchListItem
            key={project.id}
            {...project}
            deadline={new Date(project.deadline)}
          />
        ))}
      </SearchList>
    ),
    searchPagination: (
      <SearchPagination totalCount={mockedProjectSearchList.length} />
    ),
  },
} satisfies Story;
