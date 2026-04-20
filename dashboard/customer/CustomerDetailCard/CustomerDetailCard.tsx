import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/dashboard/common/DetailCard";
import { useTranslations } from "next-intl";

interface CustomerDetailCardProps {
  customerDetailHeaderContainer: React.ReactNode;
  customerDetailContainer: React.ReactNode;
  customerDetailActions: React.ReactNode;
}

export function CustomerDetailCard({
  customerDetailHeaderContainer,
  customerDetailContainer,
  customerDetailActions,
}: CustomerDetailCardProps) {
  const t = useTranslations("dashboard.customers.CustomerDetailCard");

  return (
    <DetailCard data-test="customer-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{customerDetailContainer}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {customerDetailHeaderContainer}
        {customerDetailActions}
      </DetailCardRight>
    </DetailCard>
  );
}
