import { type Decorator } from "@storybook/react";
import { SearchList } from "@/components/search/SearchList";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreatePositionModal } from "@/components/position/CreatePositionModal";
import { SearchListStory } from "@/components/search/SearchList/__stories__";

export const withPositionsPageModals: Decorator = (Story) => {
  return (
    <>
      <Story />
      <TaskSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
      <CreatePositionModal />
    </>
  );
};
