import { type Decorator } from "@storybook/react";
import { TaskSearchModal } from "../TaskSearchModal";
import { SearchList } from "@/components/search/SearchList";
import { SearchListStory } from "@/components/search/SearchList/__stories__";

export const withTaskSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <TaskSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
    </>
  );
};
