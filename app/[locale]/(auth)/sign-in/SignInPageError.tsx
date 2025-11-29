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
import { useTranslations } from "next-intl";
import { SendVerificationButton } from "@/components/auth/SendVerificationButton";
import { AuthCardFooterSignUpItem } from "@/components/auth/AuthCardFooterSignUpItem";

interface SignInPageErrorProps {
  error: Error;
  email: string;
}

export function SignInPageError({ error, email }: SignInPageErrorProps) {
  const t = useTranslations("app.SignInPageError");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{error.message || t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>
          {error.name === "EMAIL_NOT_VERIFIED"
            ? t("subtitle.emailNotVerified")
            : t("subtitle.otherError")}
        </AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        {error.name === "EMAIL_NOT_VERIFIED" ? (
          <SendVerificationButton email={email} />
        ) : (
          <Button
            variant="outlined"
            className="justify-center py-4"
            iconLeft={<LogIn size={18} strokeWidth={1.5} absoluteStrokeWidth />}
            label={t("signInButtonLabel")}
            size="medium"
          />
        )}
      </AuthCardBody>
      <AuthCardFooter>
        <AuthCardFooterSignUpItem />
      </AuthCardFooter>
    </AuthCard>
  );
}
