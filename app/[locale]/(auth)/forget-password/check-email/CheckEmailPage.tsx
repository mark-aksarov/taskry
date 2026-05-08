import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { Button } from "@/ui/Button";
import { useTranslations } from "next-intl";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

export function CheckEmailPage() {
  const t = useTranslations("app.CheckEmailPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <Button
          as="a"
          href="/forget-password"
          outlined
          variant="primary"
          className="justify-center py-4"
          label={t("backButtonLabel")}
          size="medium"
        />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
