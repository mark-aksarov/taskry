import { type Decorator } from "@storybook/react";
import { UserSearchModal } from "../UserSearchModal";
import { SearchList } from "@/components/search/SearchList";
import { SearchListStory } from "@/components/search/SearchList/__stories__";

export const withUserSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <UserSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
    </>
  );
};
