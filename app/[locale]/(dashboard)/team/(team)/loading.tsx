import { PageListSkeleton } from "@/components/common/PageListSkeleton";
import { UserListItemSkeleton } from "@/components/users/UserListItem";
import { useTranslations } from "next-intl";

export default function UsersPageLoading() {
  const t = useTranslations("app.UsersPageLoading");

  return (
    <PageListSkeleton
      title={t("title")}
      renderItemSkeleton={() => <UserListItemSkeleton />}
    />
  );
}
