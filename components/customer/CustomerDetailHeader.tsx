import { useTranslations } from "next-intl";
import { DetailHeader } from "@/components/common/DetailHeader";
import { PersonDetailHeaderImage } from "../common/PersonDetailHeaderImage";

interface CustomerDetailHeaderProps {
  fullName: string;
  imageUrl?: string;
  companyName?: string;
}

export function CustomerDetailHeader({
  fullName,
  imageUrl,
  companyName,
}: CustomerDetailHeaderProps) {
  const t = useTranslations("customers.CustomerDetail");

  return (
    <DetailHeader
      title={fullName}
      image={<PersonDetailHeaderImage alt={fullName} imageUrl={imageUrl} />}
      subtitle={companyName ? companyName : t("noCompany")}
    />
  );
}
