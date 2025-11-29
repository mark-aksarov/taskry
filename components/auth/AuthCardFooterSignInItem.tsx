import { useTranslations } from "next-intl";
import {
  AuthCardFooterItem,
  AuthCardFooterLink,
  AuthCardFooterText,
} from "./AuthCard";

export function AuthCardFooterSignInItem() {
  const t = useTranslations("auth.AuthCardFooterSignInItem");

  return (
    <AuthCardFooterItem>
      <AuthCardFooterText>{t("text")}</AuthCardFooterText>
      <AuthCardFooterLink href="/sign-in">{t("link")}</AuthCardFooterLink>
    </AuthCardFooterItem>
  );
}
