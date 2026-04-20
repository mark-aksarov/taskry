import { type Decorator } from "@storybook/nextjs-vite";
import { ProjectSearchModal } from "../ProjectSearchModal";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";

export const withProjectSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <ProjectSearchModal searchContainer={<SearchListExample />} />
    </>
  );
};
