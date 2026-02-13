import { SearchModal } from "../SearchModal";
import { SearchField } from "../../SearchField";
import { fn } from "storybook/internal/test";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchPresentation } from "../../SearchPresentation";
import { SearchEmptySection } from "../../SearchEmptySection";
import { SearchList, SearchListSkeleton } from "../../SearchList";
import { UsersSearchListStory } from "../../SearchList/__stories__";
import { TasksSearchListStory } from "../../SearchList/__stories__";
import { ModalPagination } from "@/components/common/ModalPagination";
import { ProjectsSearchListStory } from "../../SearchList/__stories__";
import { CustomersSearchListStory } from "../../SearchList/__stories__";
import { SearchToggleButtonGroup } from "../../SearchToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SearchToggleButtonGroupStory } from "../../SearchToggleButtonGroup/__stories__";
import { ModalPaginationStory } from "@/components/common/ModalPagination/__stories__";

const meta = {
  title: "components/search/SearchModal",
  component: SearchModal,
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
    pagination={<ModalPagination {...ModalPaginationStory.args} />}
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
