import { PersonHeader } from "@/components/common/PersonHeader";
import { getUserDetails } from "@/lib/queries/user";
import { useTranslations } from "next-intl";

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
