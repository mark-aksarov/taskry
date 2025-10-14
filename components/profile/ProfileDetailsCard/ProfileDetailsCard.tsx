import { use, useMemo } from "react";
import { UserPreview } from "@/lib/queries/types";
import { ProfileDetailsCardInner } from "./ProfileDetailsCardInner";

export function ProfileDetailsCard({
  userPromise,
}: {
  userPromise: Promise<UserPreview>;
}) {
  const user = use(userPromise);

  const formattedBirthdate = useMemo(() => {
    if (!user?.birthdate) return "—";
    try {
      const date = new Date(user.birthdate);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "Invalid date";
    }
  }, [user?.birthdate]);

  return (
    <ProfileDetailsCardInner
      user={user}
      formattedBirthdate={formattedBirthdate}
    />
  );
}
