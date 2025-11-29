import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { Button } from "@/components/ui";
import { useTranslations } from "next-intl";
import { AuthCardFooterSignInItem } from "@/components/auth/AuthCardFooterSignInItem";

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
          variant="outlined"
          className="justify-center py-4"
          label={t("backButtonLabel")}
          size="medium"
        />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignInItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
