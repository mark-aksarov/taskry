import { type Decorator } from "@storybook/nextjs-vite";
import { ProjectSearchModal } from "../ProjectSearchModal";
import { SearchList } from "@/components/search/SearchList";
import { SearchListStory } from "@/components/search/SearchList/__stories__";

export const withProjectSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <ProjectSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
    </>
  );
};
