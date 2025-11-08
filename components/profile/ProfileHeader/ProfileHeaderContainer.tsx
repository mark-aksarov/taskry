import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProfileHeader } from "./ProfileHeader";

const getUser = cache(async (userId: string) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      imageUrl: true,

      position: {
        select: {
          name: true,
        },
      },
    },
  });
});

export async function ProfileHeaderContainer() {
  const user = await getUser("BKs42HvVDEZFoaJUmTqf1gTN0K8pUFjI");

  return <ProfileHeader user={user} />;
}
