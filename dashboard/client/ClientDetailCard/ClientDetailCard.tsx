import {
  DetailCard,
  DetailCardLeft,
  DetailCardTitle,
  DetailCardRight,
  DetailCardHeader,
} from "@/dashboard/common/DetailCard";
import { useTranslations } from "next-intl";

interface ClientDetailCardProps {
  clientDetailHeaderContainer: React.ReactNode;
  clientDetailContainer: React.ReactNode;
  clientDetailActions: React.ReactNode;
}

export function ClientDetailCard({
  clientDetailHeaderContainer,
  clientDetailContainer,
  clientDetailActions,
}: ClientDetailCardProps) {
  const t = useTranslations("dashboard.clients.ClientDetailCard");

  return (
    <DetailCard data-test="client-card">
      <DetailCardLeft>
        <DetailCardHeader>
          <DetailCardTitle>{t("title")}</DetailCardTitle>
        </DetailCardHeader>
        <div className="p-6">{clientDetailContainer}</div>
      </DetailCardLeft>

      <DetailCardRight>
        {clientDetailHeaderContainer}
        {clientDetailActions}
      </DetailCardRight>
    </DetailCard>
  );
}
