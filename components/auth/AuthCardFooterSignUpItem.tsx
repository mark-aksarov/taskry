import {
  AuthCardFooterItem,
  AuthCardFooterLink,
  AuthCardFooterText,
} from "./AuthCard";
import { useTranslations } from "next-intl";

export function AuthCardFooterSignUpItem() {
  const t = useTranslations("auth.AuthCardFooterSignUpItem");

  return (
    <AuthCardFooterItem>
      <AuthCardFooterText>{t("text")}</AuthCardFooterText>
      <AuthCardFooterLink href="/sign-up">{t("link")}</AuthCardFooterLink>
    </AuthCardFooterItem>
  );
}
