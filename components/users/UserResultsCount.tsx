import { useTranslations } from "next-intl";
import { ResultsCount } from "../common/ResultsCount";

export function UserResultsCount({ count }: { count: number }) {
  const t = useTranslations("users.UserResultsCount");

  return <ResultsCount>{t("usersFound", { count })}</ResultsCount>;
}
