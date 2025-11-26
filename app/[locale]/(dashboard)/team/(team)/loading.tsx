import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { UserListItemSkeleton } from "@/components/users/UserListItem";

export default function UsersPageLoading() {
  return (
    <PageListSkeleton
      title="Team"
      renderItemSkeleton={() => <UserListItemSkeleton />}
    />
  );
}
