import { SearchModal } from "../SearchModal";
import { fn } from "storybook/internal/test";
import { SearchField } from "../../SearchField";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchPagination } from "../../SearchPagination";
import { SearchPresentation } from "../../SearchPresentation";
import { SearchList, SearchListSkeleton } from "../../SearchList";
import { TasksSearchListStory } from "../../SearchList/__stories__";
import { ProjectsSearchListStory } from "../../SearchList/__stories__";
import { SearchToggleButtonGroup } from "../../SearchToggleButtonGroup";
import { SearchEmptyPresentation } from "../../SearchEmptyPresentation";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchToggleButtonGroupStory } from "../../SearchToggleButtonGroup/__stories__";
import { SearchPaginationSkeleton } from "../../SearchPagination/SearchPaginationSkeleton";

const meta = {
  title: "components/search/SearchModal",
  component: SearchModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Search" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchContainer = ({
  searchResult,
  searchPagination,
  selectedToggleKey,
}: {
  searchResult: React.ReactNode;
  searchPagination: React.ReactNode;
  selectedToggleKey: string;
}) => (
  <SearchPresentation
    searchField={<SearchField value="" onChange={fn()} />}
    searchToggleButtonGroup={
      <SearchToggleButtonGroup
        {...SearchToggleButtonGroupStory.args}
        selectedKeys={[selectedToggleKey]}
      />
    }
    searchResult={searchResult}
    searchPagination={searchPagination}
  />
);

export const Default = {
  args: {
    tasksSearchContainer: (
      <SearchContainer
        searchResult={<SearchList {...TasksSearchListStory.args} />}
        searchPagination={<SearchPagination totalCount={30} />}
        selectedToggleKey="tasks"
      />
    ),
    projectsSearchContainer: (
      <SearchContainer
        searchResult={<SearchList {...ProjectsSearchListStory.args} />}
        searchPagination={<SearchPagination totalCount={30} />}
        selectedToggleKey="projects"
      />
    ),
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
    tasksSearchContainer: (
      <SearchEmptyPresentation
        searchField={<SearchField value="" onChange={fn()} />}
      />
    ),
    projectsSearchContainer: (
      <SearchEmptyPresentation
        searchField={<SearchField value="" onChange={fn()} />}
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    tasksSearchContainer: (
      <SearchContainer
        searchResult={<SearchListSkeleton />}
        searchPagination={<SearchPaginationSkeleton />}
        selectedToggleKey="tasks"
      />
    ),
    projectsSearchContainer: (
      <SearchContainer
        searchResult={<SearchListSkeleton />}
        searchPagination={<SearchPaginationSkeleton />}
        selectedToggleKey="projects"
      />
    ),
  },
} satisfies Story;
