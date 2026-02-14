import { SearchModal } from "../SearchModal";
import { SearchField } from "../../SearchField";
import { fn } from "storybook/internal/test";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchPresentation } from "../../SearchPresentation";
import { SearchEmptySection } from "../../SearchEmptySection";
import { SearchList, SearchListSkeleton } from "../../SearchList";
import { TasksSearchListStory } from "../../SearchList/__stories__";
import { ModalPagination } from "@/components/common/ModalPagination";
import { ProjectsSearchListStory } from "../../SearchList/__stories__";
import { SearchToggleButtonGroup } from "../../SearchToggleButtonGroup";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ModalPaginationStory } from "@/components/common/ModalPagination/__stories__";
import { SearchToggleButtonGroupStory } from "../../SearchToggleButtonGroup/__stories__";

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
  },
} satisfies Story;

export const WithEmptySection = {
  args: {
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
  },
} satisfies Story;

export const WithSkeletonContent = {
  args: {
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
  },
} satisfies Story;
