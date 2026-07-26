import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { AcceptInvitationButton } from "@/auth/AcceptInvitationButton";

interface AcceptInvitationPageProps {
  invitationId: string;
}

export function AcceptInvitationPage({
  invitationId,
}: AcceptInvitationPageProps) {
  const t = useTranslations("app.AcceptInvitationPage");

  return (
    <AuthCard>
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody>
        <AcceptInvitationButton invitationId={invitationId} />
      </AuthCardBody>
    </AuthCard>
  );
}
