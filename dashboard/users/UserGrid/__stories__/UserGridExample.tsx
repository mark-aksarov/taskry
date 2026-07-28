import { mockedUserList } from "@/mocks/users";
import { UserListItem } from "../../UserListItem";
import { useViewMode } from "@/dashboard/common/ViewMode";
import { EntityGrid } from "@/dashboard/common/EntityGrid";
import { DeleteUserProvider } from "../../DeleteUserContext";
import { UpdateUserProvider } from "../../UpdateUserProvider";
import { UserGridItemLarge, UserGridItemMobile } from "../../UserGridItem";

export function UserGridExample() {
  const { viewMode } = useViewMode();

  return (
    <EntityGrid viewMode={viewMode}>
      {mockedUserList.map((user) => (
        <DeleteUserProvider key={user.id}>
          <UpdateUserProvider>
            <UserListItem {...user} />
            <UserGridItemMobile {...user} />
            <UserGridItemLarge {...user} />
          </UpdateUserProvider>
        </DeleteUserProvider>
      ))}
    </EntityGrid>
  );
}
