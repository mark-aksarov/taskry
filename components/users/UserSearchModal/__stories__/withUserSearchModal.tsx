import { UserSearchModal } from "../UserSearchModal";
import { type Decorator } from "@storybook/nextjs-vite";
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
