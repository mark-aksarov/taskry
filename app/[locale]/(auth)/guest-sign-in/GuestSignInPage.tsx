import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { SignInAsGuestForm } from "@/auth/SignInAsGuestForm";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

interface GuestSignInPageProps {
  signIn: ActionFn<ActionState, FormData>;
}

export function GuestSignInPage({ signIn }: GuestSignInPageProps) {
  const t = useTranslations("app.GuestSignInPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <SignInAsGuestForm signIn={signIn} />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
