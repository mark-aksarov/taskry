import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
} from "@/components/auth/AuthCard";
import { Button } from "@/components/ui";
import { LogIn } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ResetPasswordNotFound() {
  const t = useTranslations("app.ResetPasswordPage.notFound");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
      </AuthCardHeader>
      <AuthCardBody>
        <p className="text-sm text-black dark:text-white">{t("body")}</p>
        <Button
          as="a"
          href="/signIn"
          variant="outlined"
          className="justify-center py-4"
          iconLeft={<LogIn size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("signInButtonLabel")}
          size="medium"
        />
      </AuthCardBody>
    </AuthCard>
  );
}
