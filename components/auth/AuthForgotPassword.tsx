import { AuthLink } from "./AuthLink";
import { useTranslations } from "next-intl";

export function AuthForgotPassword() {
  const t = useTranslations("auth.AuthForgotPassword");

  return <AuthLink href="/forget-password">{t("link")}</AuthLink>;
}
