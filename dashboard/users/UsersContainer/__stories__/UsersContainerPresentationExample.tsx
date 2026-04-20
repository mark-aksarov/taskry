import { mockedUserList } from "@/mocks/users";
import { UserListItem } from "../../UserListItem";
import { UserGridItemLarge, UserGridItemMobile } from "../../UserGridItem";
import { MockedDeleteUserProvider } from "../../DeleteUserProvider/__stories__";
import { MockedUpdateUserProvider } from "../../UpdateUserProvider/__stories__";
import { EntityContainerPresentation } from "@/dashboard/common/EntityContainerPresentation";

export function UsersContainerPresentationExample() {
  return (
    <EntityContainerPresentation page={1} pageSize={10} totalPages={3}>
      {mockedUserList.map((user) => (
        <MockedDeleteUserProvider key={user.id}>
          <MockedUpdateUserProvider>
            <UserListItem {...user} />
            <UserGridItemMobile {...user} />
            <UserGridItemLarge {...user} />
          </MockedUpdateUserProvider>
        </MockedDeleteUserProvider>
      ))}
    </EntityContainerPresentation>
  );
}
