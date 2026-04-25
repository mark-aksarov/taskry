import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { AcceptInviteForm } from "@/auth/AcceptInviteForm";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { AuthLangMenuTrigger } from "@/auth/AuthLangMenuTrigger";
import { AuthCardSignInFooter } from "@/auth/AuthCardSignInFooter";

interface AcceptInvitePageProps {
  email: string;
  acceptInvite: ActionFn<ActionState, FormData>;
}

export function AcceptInvitePage({
  email,
  acceptInvite,
}: AcceptInvitePageProps) {
  const t = useTranslations("app.AcceptInvitePage");

  return (
    <AuthCard>
      <AuthLangMenuTrigger />
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <AcceptInviteForm email={email} acceptInvite={acceptInvite} />
      </AuthCardBody>
      <AuthCardSignInFooter />
    </AuthCard>
  );
}
