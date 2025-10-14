import { Suspense } from "react";
import { getUserById } from "@/lib/queries/user";
import {
  ProfileSummaryCard,
  ProfileSummaryCardSkeleton,
} from "@/components/profile/ProfileSummaryCard";
import {
  ProfileDetailsCard,
  ProfileDetailsCardSkeleton,
} from "@/components/profile/ProfileDetailsCard";

export default async function ProfilePage() {
  const userPromise = getUserById("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return (
    <Suspense
      fallback={
        <>
          <ProfileSummaryCardSkeleton />
          <ProfileDetailsCardSkeleton />
        </>
      }
    >
      <ProfileSummaryCard />
      <ProfileDetailsCard userPromise={userPromise} />
    </Suspense>
  );
}
