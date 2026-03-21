import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { AuthLangMenuTrigger } from "@/components/auth/AuthLangMenuTrigger";
import { AuthCardSignInFooter } from "@/components/auth/AuthCardSignInFooter";

export function CheckEmailPage() {
  const t = useTranslations("app.CheckEmailPage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <Button
          as="a"
          href="/forget-password"
          variant="outlined"
          className="justify-center py-4"
          label={t("backButtonLabel")}
          size="medium"
        />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
