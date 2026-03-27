import { Decorator } from "@storybook/nextjs-vite";
import { mockedPositionSummaries } from "@/mocks/positions";
import { SearchList } from "@/components/search/SearchList";
import { UserSearchModal } from "@/components/users/UserSearchModal";
import { CreateUserModal } from "@/components/users/CreateUserModal";
import { UserFiltersForm } from "@/components/users/UserFiltersForm";
import { UserFiltersModal } from "@/components/users/UserFiltersModal";
import { SearchListStory } from "@/components/search/SearchList/__stories__";
import { CreatePositionModal } from "@/components/position/CreatePositionModal";
import { UserPositionFiltersForm } from "@/components/users/UserPositionFiltersForm";
import { UserPositionFiltersModal } from "@/components/users/UserPositionFiltersModal";

export const withUsersPageModals: Decorator = (Story) => {
  return (
    <>
      <Story />

      <UserSearchModal
        searchContainer={<SearchList {...SearchListStory.args} />}
      />
      <CreateUserModal />
      <CreatePositionModal />
      <UserFiltersModal
        filtersFormContainer={
          <UserFiltersForm
            positionCheckboxGroupItems={mockedPositionSummaries}
          />
        }
      />
      <UserPositionFiltersModal
        filtersFormContainer={
          <UserPositionFiltersForm
            positionCheckboxGroupItems={mockedPositionSummaries}
          />
        }
      />
    </>
  );
};
