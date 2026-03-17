import { useTranslations } from "next-intl";
import { ResultsCount } from "../common/ResultsCount";

export function CustomerResultsCount({ count }: { count: number }) {
  const t = useTranslations("customers.CustomerResultsCount");

  return <ResultsCount>{t("customersFound", { count })}</ResultsCount>;
}
