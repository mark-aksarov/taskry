import { notFound } from "next/navigation";
import { UserDetail } from "../UserDetail";
import { getUserDetail } from "@/lib/data/user/user.service";

export async function ProfileDetailContainer({ userId }: { userId: string }) {
  const user = await getUserDetail(userId);

  if (!user) {
    notFound();
  }

  return (
    <UserDetail
      id={user.id}
      fullName={user.fullName}
      bio={user.bio}
      email={user.email}
      phoneNumber={user.phoneNumber}
      address={user.address}
      publicLink={user.publicLink}
      birthdate={user.birthdate}
      position={user.position}
    />
  );
}
