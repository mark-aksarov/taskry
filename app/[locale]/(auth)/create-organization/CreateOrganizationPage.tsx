import {
  AuthCard,
  AuthCardBody,
  AuthCardHeader,
  AuthCardHeading,
  AuthCardSubtitle,
} from "@/auth/AuthCard";
import { useTranslations } from "next-intl";
import { AuthSignOutButton } from "@/auth/AuthSignOutButton";
import { CreateOrganizationButton } from "@/auth/CreateOrganizationButton";

export function CreateOrganizationPage() {
  const t = useTranslations("app.CreateOrganizationPage");

  return (
    <AuthCard data-test="create-organization-page">
      <AuthCardHeader>
        <AuthCardHeading>{t("heading")}</AuthCardHeading>
        <AuthCardSubtitle>{t("subtitle")}</AuthCardSubtitle>
      </AuthCardHeader>
      <AuthCardBody className="gap-4">
        <CreateOrganizationButton />
        <AuthSignOutButton />
      </AuthCardBody>
    </AuthCard>
  );
}
