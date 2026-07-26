import { signOut } from "@/lib/actions/auth/signOut";
import { CreateOrganizationPage } from "./CreateOrganizationPage";
import { redirectAuthenticatedToDashboard } from "@/lib/utils/redirectAuthenticatedToDashboard";
import { redirectAuthenticatedToVerifyEmail } from "@/lib/utils/redirectAuthenticatedToVerifyEmail";

export default async function AppCreateOrganizationPage() {
  await redirectAuthenticatedToVerifyEmail();
  await redirectAuthenticatedToDashboard();

  return <CreateOrganizationPage signOut={signOut} />;
}
