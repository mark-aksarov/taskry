import { VerifyEmailPage } from "./VerifyEmailPage";
import { signOut } from "@/lib/actions/auth/signOut";
import { getSession } from "@/lib/data/utils/getSession";
import { sendVerificationEmail } from "@/lib/actions/auth/sendVerificationEmail";
import { redirectUnauthenticatedToSignIn } from "@/lib/utils/redirectUnauthenticatedToSignIn";
import { redirectAuthenticatedToDashboard } from "@/lib/utils/redirectAuthenticatedToDashboard";
import { redirectAuthenticatedToCreateOrganization } from "@/lib/utils/redirectAuthenticatedToCreateOrganization";

export default async function AppVerifyEmailPage() {
  await redirectUnauthenticatedToSignIn();
  await redirectAuthenticatedToCreateOrganization();
  await redirectAuthenticatedToDashboard();

  const session = await getSession();

  return (
    <VerifyEmailPage
      email={session!.user.email}
      signOut={signOut}
      sendVerificationEmail={sendVerificationEmail}
    />
  );
}
