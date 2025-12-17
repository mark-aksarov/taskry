import { useTranslations } from "next-intl";
import { getUserDetails } from "@/lib/dal/user";
import { PersonHeader } from "@/components/common/PersonHeader";

export async function UserHeaderServerContainer({
  userId,
}: {
  userId: string;
}) {
  const t = useTranslations("users.UserHeaderServerContainer");

  const user = await getUserDetails(userId);

  return (
    <PersonHeader
      title={user.fullName}
      imageUrl={user.imageUrl ?? undefined}
      subtitle={user.position ? user.position.name : t("unknownPosition")}
    />
  );
}
