import { auth } from "../auth";
import { headers } from "next/headers";

export async function canEditUserProfile({
  session,
  profileUserId,
}: {
  session: typeof auth.$Infer.Session | null;
  profileUserId: string;
}) {
  let canEdit = true;

  if (session) {
    const { role } = await auth.api.getActiveMemberRole({
      headers: await headers(),
    });

    canEdit = role === "owner" || session.user.id === profileUserId;
  }

  return canEdit;
}
