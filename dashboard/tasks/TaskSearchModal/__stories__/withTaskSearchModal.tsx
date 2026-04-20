import { TaskSearchModal } from "../TaskSearchModal";
import { type Decorator } from "@storybook/nextjs-vite";
import { SearchList } from "@/dashboard/search/SearchList";
import { SearchListExample } from "@/dashboard/search/SearchList/__stories__";

export const withTaskSearchModal: Decorator = (Story) => {
  return (
    <>
      <Story />

      <TaskSearchModal searchContainer={<SearchListExample />} />
    </>
  );
};
