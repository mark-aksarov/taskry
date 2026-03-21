import { AuthLink } from "./AuthLink";
import { useTranslations } from "next-intl";
import { AuthCardFooter } from "./AuthCard";

export function AuthCardSignUpFooter() {
  const t = useTranslations("auth.AuthCardSignUpFooter");

  return (
    <AuthCardFooter
      text={t("text")}
      link={<AuthLink href="/sign-up">{t("link")}</AuthLink>}
    />
  );
}
