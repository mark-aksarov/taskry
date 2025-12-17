import { Prisma } from "@/generated/prisma/client";

// CustomerSummary

const customerSummarySelect = {
  id: true,
  fullName: true,
} satisfies Prisma.CustomerSelect;

export type CustomerSummaryType = Prisma.CustomerGetPayload<{
  select: typeof customerSummarySelect;
}>;

// CustomerDetail

const customerDetailSelect = {
  id: true,
  fullName: true,
  email: true,
  phoneNumber: true,
  imageUrl: true,
  publicLink: true,
  bio: true,
  workspaceId: true,

  company: {
    select: {
      name: true,
    },
  },
} satisfies Prisma.CustomerSelect;

export type CustomerDetailType = Prisma.CustomerGetPayload<{
  select: typeof customerDetailSelect;
}>;

// CustomerListItem

const customerListItemSelect = {
  id: true,
  fullName: true,
  email: true,
  phoneNumber: true,
  publicLink: true,
  imageUrl: true,

  company: {
    select: {
      id: true,
      name: true,
    },
  },
} satisfies Prisma.CustomerSelect;

export type CustomerListItemType = Prisma.CustomerGetPayload<{
  select: typeof customerListItemSelect;
}>;
