import { UserSearchModal } from "../UserSearchModal";
import { type Decorator } from "@storybook/nextjs-vite";
import { SearchListExample } from "@/components/search/SearchList/__stories__";

export const withUserSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <UserSearchModal searchContainer={<SearchListExample />} />
    </>
  );
};
