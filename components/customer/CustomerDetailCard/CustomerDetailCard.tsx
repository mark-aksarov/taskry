import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/components/common/DetailCard";
import { useTranslations } from "next-intl";
import { CustomerDetailActions } from "../CustomerDetailActions";

interface CustomerDetailCardProps {
  customerHeader: React.ReactNode;
  customerDetail: React.ReactNode;
  customerDetailActions: React.ReactNode;
}

export function CustomerDetailCard({
  customerHeader,
  customerDetail,
  customerDetailActions,
}: CustomerDetailCardProps) {
  const t = useTranslations("customers.CustomerDetailCard");

  return (
    <DetailCard data-test="customer-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{customerDetail}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {customerHeader}
        {customerDetailActions}
      </DetailCardRight>
    </DetailCard>
  );
}
