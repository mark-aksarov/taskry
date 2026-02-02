import { SearchModal } from "./SearchModal";
import { SearchField } from "../SearchField";
import { fn } from "storybook/internal/test";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchPresentation } from "../SearchPresentation";
import { SearchEmptySection } from "../SearchEmptySection";
import { SearchList, SearchListSkeleton } from "../SearchList";
import { SearchToggleButtonGroup } from "../SearchToggleButtonGroup";
import { ModalPagination } from "@/components/common/ModalPagination";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UsersSearchList as UsersSearchListStory } from "../SearchList/SearchList.stories";
import { TasksSearchList as TasksSearchListStory } from "../SearchList/SearchList.stories";
import { ProjectsSearchList as ProjectsSearchListStory } from "../SearchList/SearchList.stories";
import { CustomersSearchList as CustomersSearchListStory } from "../SearchList/SearchList.stories";
import { Default as SearchToggleButtonGroupStory } from "../SearchToggleButtonGroup/SearchToggleButtonGroup.stories";

const meta = {
  title: "Components/search/SearchModal",
  component: SearchModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New project" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchContainer = ({
  searchResultList,
  selectedToggleKey,
}: {
  searchResultList: React.ReactNode;
  selectedToggleKey: string;
}) => (
  <SearchPresentation
    totalPages={2}
    searchField={<SearchField value="" onChange={fn()} />}
    searchToggleButtonGroup={
      <SearchToggleButtonGroup
        {...SearchToggleButtonGroupStory.args}
        selectedKeys={[selectedToggleKey]}
      />
    }
    searchResult={searchResultList}
    pagination={
      <ModalPagination
        page={1}
        pageSize={10}
        setPage={fn()}
        totalCount={30}
        totalPages={3}
      />
    }
  />
);

export const Default = {
  args: {
    usersSearchContainer: (
      <SearchContainer
        searchResultList={<SearchList {...UsersSearchListStory.args} />}
        selectedToggleKey="users"
      />
    ),
    tasksSearchContainer: (
      <SearchContainer
        searchResultList={<SearchList {...TasksSearchListStory.args} />}
        selectedToggleKey="tasks"
      />
    ),
    projectsSearchContainer: (
      <SearchContainer
        searchResultList={<SearchList {...ProjectsSearchListStory.args} />}
        selectedToggleKey="projects"
      />
    ),
    customersSearchContainer: (
      <SearchContainer
        searchResultList={<SearchList {...CustomersSearchListStory.args} />}
        selectedToggleKey="customers"
      />
    ),
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
    usersSearchContainer: (
      <SearchContainer
        searchResultList={<SearchEmptySection />}
        selectedToggleKey="users"
      />
    ),
    tasksSearchContainer: (
      <SearchContainer
        searchResultList={<SearchEmptySection />}
        selectedToggleKey="tasks"
      />
    ),
    projectsSearchContainer: (
      <SearchContainer
        searchResultList={<SearchEmptySection />}
        selectedToggleKey="projects"
      />
    ),
    customersSearchContainer: (
      <SearchContainer
        searchResultList={<SearchEmptySection />}
        selectedToggleKey="customers"
      />
    ),
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
    usersSearchContainer: (
      <SearchContainer
        searchResultList={<SearchListSkeleton />}
        selectedToggleKey="users"
      />
    ),
    tasksSearchContainer: (
      <SearchContainer
        searchResultList={<SearchListSkeleton />}
        selectedToggleKey="tasks"
      />
    ),
    projectsSearchContainer: (
      <SearchContainer
        searchResultList={<SearchListSkeleton />}
        selectedToggleKey="projects"
      />
    ),
    customersSearchContainer: (
      <SearchContainer
        searchResultList={<SearchListSkeleton />}
        selectedToggleKey="customers"
      />
    ),
  },
} satisfies Story;
