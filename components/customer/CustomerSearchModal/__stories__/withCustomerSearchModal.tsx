import { type Decorator } from "@storybook/nextjs-vite";
import { CustomerSearchModal } from "../CustomerSearchModal";
import { SearchListExample } from "@/components/search/SearchList/__stories__";

export const withCustomerSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <CustomerSearchModal searchContainer={<SearchListExample />} />
    </>
  );
};
