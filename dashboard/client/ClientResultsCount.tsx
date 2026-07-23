import { useTranslations } from "next-intl";
import { ResultsCount } from "../common/ResultsCount";

export function ClientResultsCount({ count }: { count: number }) {
  const t = useTranslations("dashboard.clients.ClientResultsCount");

  return <ResultsCount>{t("clientsFound", { count })}</ResultsCount>;
}
