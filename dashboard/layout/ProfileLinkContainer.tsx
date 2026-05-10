import "server-only";

import { notFound } from "next/navigation";
import { ProfileLink } from "./ProfileLink/ProfileLink";
import { requireProtectedPage } from "@/lib/utils/requireProtectedPage";

export async function ProfileLinkContainer() {
  const session = await requireProtectedPage();

  if (!session) {
    notFound();
  }

  return (
    <div className="flex items-center gap-2">
      <ProfileLink
        userId={session.user.id}
        fullName={session.user.name}
        imageUrl={session.user.imageUrl}
      />
    </div>
  );
}
