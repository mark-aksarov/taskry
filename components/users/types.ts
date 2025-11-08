import { Prisma } from "@/generated/prisma";

export type UserItem = Prisma.UserGetPayload<{
  select: {
    id: true;
    fullName: true;
    phoneNumber: true;
    email: true;
    imageUrl: true;
    publicLink: true;

    position: {
      select: {
        name: true;
        workspaceId: true;
      };
    };
  };
}>;

export type UserDetail = Prisma.UserGetPayload<{
  select: {
    id: true;
    fullName: true;
    phoneNumber: true;
    email: true;
    imageUrl: true;
    publicLink: true;
    birthdate: true;
    bio: true;
    address: true;

    position: {
      select: {
        name: true;
        workspaceId: true;
      };
    };
  };
}>;
