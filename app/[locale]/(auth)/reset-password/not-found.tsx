import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { LogIn } from "lucide-react";
import { ButtonLink } from "@/ui/Button";
import { useTranslations } from "next-intl";

export default function PasswordNotFound() {
  const t = useTranslations("app.ResetPasswordNotFound");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("body")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <ButtonLink
          href="/signIn"
          outlined
          variant="primary"
          className="justify-center py-4"
          iconLeft={<LogIn size={18}   />}
          label={t("signInButtonLabel")}
          size="medium"
        />
      </AuthCardBody>
    </AuthCard>
  );
}
