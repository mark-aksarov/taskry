import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { ActionState } from "@/lib/actions/types";
import { AuthSignOutButton } from "@/auth/AuthSignOutButton";
import { CreateOrganizationButton } from "@/auth/CreateOrganizationButton";

interface CreateOrganizationPageProps {
  signOut: () => Promise<ActionState>;
}

export function CreateOrganizationPage({
  signOut,
}: CreateOrganizationPageProps) {
  const t = useTranslations("app.CreateOrganizationPage");

  return (
    <AuthCard data-test="create-organization-page">
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody className="gap-4">
        <CreateOrganizationButton />
        <AuthSignOutButton signOut={signOut} />
      </AuthCardBody>
    </AuthCard>
  );
}
