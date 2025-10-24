import { use, useMemo } from "react";
import { UserPreview } from "@/lib/queries/types";
import { ProfileInfoInner } from "./ProfileInfoInner";

export function ProfileInfo({
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
    <ProfileInfoInner user={user} formattedBirthdate={formattedBirthdate} />
  );
}
