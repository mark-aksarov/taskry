import { useTranslations } from "next-intl";
import { AuthCardFooterItem, AuthCardFooterLink } from "./AuthCard";

export function AuthCardFooterForgotPasswordItem() {
  const t = useTranslations("auth.AuthCardFooterForgotPasswordItem");

  return (
    <AuthCardFooterItem>
      <AuthCardFooterLink href="/forget-password">
        {t("link")}
      </AuthCardFooterLink>
    </AuthCardFooterItem>
  );
}
