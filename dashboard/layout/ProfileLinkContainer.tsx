import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ProfileLink } from "./ProfileLink/ProfileLink";
import { getUserDetail } from "@/lib/data/user/user.dal";

export async function ProfileLinkContainer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = await getUserDetail(session!.user.id);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex items-center gap-2">
      <ProfileLink fullName={user.fullName} imageUrl={user.imageUrl} />
    </div>
  );
}
