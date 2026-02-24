import {
  TasksSearchPresentationStory,
  ProjectsSearchPresentationStory,
} from "../../SearchPresentation/__stories__";

import { useState } from "react";
import { SearchModal } from "../SearchModal";
import { fn } from "storybook/internal/test";
import { SearchField } from "../../SearchField";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { SearchListSkeleton } from "../../SearchList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchPresentation } from "../../SearchPresentation";
import { SearchPaginationSkeleton } from "../../SearchPagination";
import { SearchEmptyPresentation } from "../../SearchEmptyPresentation";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/search/SearchModal",
  component: SearchModal,
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(true);

      return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <Button label="Search" />
          <Story />
        </DialogTrigger>
      );
    },
    withThemedBackground,
  ],
} satisfies Meta<typeof SearchModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    tasksSearchContainer: (
      <SearchPresentation {...TasksSearchPresentationStory.args} />
    ),
    projectsSearchContainer: (
      <SearchPresentation {...ProjectsSearchPresentationStory.args} />
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
      <SearchPresentation
        {...TasksSearchPresentationStory.args}
        searchResult={<SearchListSkeleton />}
        searchPagination={<SearchPaginationSkeleton />}
      />
    ),
    projectsSearchContainer: (
      <SearchPresentation
        {...ProjectsSearchPresentationStory.args}
        searchResult={<SearchListSkeleton />}
        searchPagination={<SearchPaginationSkeleton />}
      />
    ),
  },
} satisfies Story;
