import { type Decorator } from "@storybook/nextjs-vite";
import { CustomerSearchModal } from "../CustomerSearchModal";
import { SearchList } from "@/components/search/SearchList";
import { SearchListStory } from "@/components/search/SearchList/__stories__";

export const withCustomerSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <CustomerSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
    </>
  );
};
