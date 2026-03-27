import { type Decorator } from "@storybook/react";
import { SearchList } from "@/components/search/SearchList";
import { TaskSearchModal } from "@/components/tasks/TaskSearchModal";
import { CreateCompanyModal } from "@/components/company/CreateCompanyModal";
import { SearchListStory } from "@/components/search/SearchList/__stories__";

export const withCompaniesPageModals: Decorator = (Story) => {
  return (
    <>
      <Story />
      <TaskSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
      <CreateCompanyModal />
    </>
  );
};
