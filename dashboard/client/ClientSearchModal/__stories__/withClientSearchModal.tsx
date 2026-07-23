import { type Decorator } from "@storybook/nextjs-vite";
import { ClientSearchModal } from "../ClientSearchModal";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";

export const withClientSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <ClientSearchModal searchContainer={<SearchListExample />} />
    </>
  );
};
