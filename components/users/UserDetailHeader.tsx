import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface UserDetailHeaderProps {
  fullName: string;
  imageUrl?: string;
  positionName?: string;
}

export function UserDetailHeader({
  fullName,
  imageUrl,
  positionName,
}: UserDetailHeaderProps) {
  const t = useTranslations("users.UserDetailHeader");

  return (
    <DetailHeader
      title={fullName}
      image={<PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />}
      subtitle={positionName ? positionName : t("noPosition")}
    />
  );
}
