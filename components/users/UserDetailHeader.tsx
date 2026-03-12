import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";
import { UserDetailHeaderImage } from "./UserDetailHeaderImage";

interface UserDetailHeaderProps {
  userId: string;
  fullName: string;
  imageUrl?: string;
  positionName?: string;
}

export function UserDetailHeader({
  userId,
  fullName,
  imageUrl,
  positionName,
}: UserDetailHeaderProps) {
  const t = useTranslations("users.UserDetailHeader");

  return (
    <DetailHeader
      title={fullName}
      image={
        <UserDetailHeaderImage
          alt={fullName}
          userId={userId}
          imageUrl={imageUrl}
        />
      }
      subtitle={positionName ? positionName : t("noPosition")}
    />
  );
}
