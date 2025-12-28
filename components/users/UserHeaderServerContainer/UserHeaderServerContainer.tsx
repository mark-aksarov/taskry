import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { getUserDetail } from "@/lib/data/user/user.service";
import { PersonHeader } from "@/components/common/PersonHeader";

export async function UserHeaderServerContainer({
  userId,
}: {
  userId: string;
}) {
  const t = useTranslations("users.UserHeaderServerContainer");

  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
  }

  return (
    <PersonHeader
      title={user.fullName}
      imageUrl={user.imageUrl ?? undefined}
      subtitle={user.position ? user.position.name : t("unknownPosition")}
    />
  );
}
