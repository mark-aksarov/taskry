import { AcceptInvitationPage } from "./AcceptInvitationPage";

export default async function AppAcceptInvitationPage({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) {
  /**
   * Session verification is intentionally skipped to allow unauthenticated users to access the accept-invitation page.
   * Users must authenticate before accepting the invitation.
   */

  const { invitationId } = await params;

  return <AcceptInvitationPage invitationId={invitationId} />;
}
