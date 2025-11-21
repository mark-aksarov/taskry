import "server-only";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { ProfileHeader } from "../ProfileHeader";

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

export async function ProfileHeaderServerContainer({
  userId,
}: {
  userId: string;
}) {
  const user = await getUser(userId);

  return (
    <ProfileHeader
      fullName={user.fullName}
      imageUrl={user.imageUrl ?? undefined}
      position={user.position ? { name: user.position.name } : undefined}
    />
  );
}
