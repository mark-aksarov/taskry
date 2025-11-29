import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardFooter,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/components/auth/AuthCard";
import { LogIn } from "lucide-react";
import { Button } from "@/components/ui";
import { AuthCardFooterSignUpItem } from "@/components/auth/AuthCardFooterSignUpItem";
import { useTranslations } from "next-intl";

interface VerifyEmailPageProps {
  error?: string;
  email: string;
}

export function VerifyEmailPage({ error, email }: VerifyEmailPageProps) {
  const t = useTranslations("app.VerifyEmailPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        {error && (
          <AuthCardSubtitle className="text-red-600 dark:text-red-400">
            {error}
          </AuthCardSubtitle>
        )}
        <AuthCardSubtitle>{t("subtitle", { email })}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <Button
          variant="outlined"
          className="justify-center py-4"
          iconLeft={<LogIn size={18} strokeWidth={1.5} absoluteStrokeWidth />}
          label={t("signInButtonLabel")}
          size="medium"
        />
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignUpItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
