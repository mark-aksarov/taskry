import { AuthLink } from "./AuthLink";
import { useTranslations } from "next-intl";
import { AuthCardFooter } from "./AuthCard";

export function AuthCardSignInFooter() {
  const t = useTranslations("auth.AuthCardSignInFooter");

  return (
    <AuthCardFooter
      text={t("text")}
      link={<AuthLink href="/sign-in">{t("link")}</AuthLink>}
    />
  );
}
