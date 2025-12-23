import { Prisma } from "@/generated/prisma/client";

// UserSummary

export const userSummarySelect = {
  id: true,
  fullName: true,
} satisfies Prisma.UserSelect;

export type UserSummaryType = Prisma.UserGetPayload<{
  select: typeof userSummarySelect;
}>;

// UserDetail

export const userDetailSelect = {
  id: true,
  fullName: true,
  email: true,
  phoneNumber: true,
  imageUrl: true,
  publicLink: true,
  birthdate: true,
  bio: true,
  address: true,

  position: {
    select: {
      name: true,
      workspaceId: true,
    },
  },
} satisfies Prisma.UserSelect;

export type UserDetailType = Prisma.UserGetPayload<{
  select: typeof userDetailSelect;
}>;

// UserListItem

export const userListItemSelect = {
  id: true,
  fullName: true,
  email: true,
  phoneNumber: true,
  imageUrl: true,
  publicLink: true,

  position: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.UserSelect;

export type UserListItemType = Prisma.UserGetPayload<{
  select: typeof userListItemSelect;
}>;
