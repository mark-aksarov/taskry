import { mockedUserList } from "@/mocks/users";
import { UserListItem } from "../../UserListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { UserGridItemLarge, UserGridItemMobile } from "../../UserGridItem";
import { MockedDeleteUserProvider } from "../../DeleteUserProvider/__stories__";
import { MockedUpdateUserProvider } from "../../UpdateUserProvider/__stories__";

export function UserGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedUserList.map((user) => (
        <MockedDeleteUserProvider key={user.id}>
          <MockedUpdateUserProvider>
            <UserListItem {...user} />
            <UserGridItemMobile {...user} />
            <UserGridItemLarge {...user} />
          </MockedUpdateUserProvider>
        </MockedDeleteUserProvider>
      ))}
    </EntityGrid>
  );
}
