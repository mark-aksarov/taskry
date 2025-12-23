import { Prisma } from "@/generated/prisma/client";

// ProjectSummary

export const projectSummarySelect = {
  id: true,
  title: true,
} satisfies Prisma.ProjectSelect;

export type ProjectSummaryType = Prisma.ProjectGetPayload<{
  select: typeof projectSummarySelect;
}>;

// ProjectFormData

export const projectFormDataSelect = {
  id: true,
  title: true,
  description: true,
  deadline: true,
  status: true,
  categoryId: true,
  customerId: true,
} satisfies Prisma.ProjectSelect;

export type ProjectFormDataType = Prisma.ProjectGetPayload<{
  select: typeof projectFormDataSelect;
}>;

// ProjectDetail

export const projectDetailSelect = {
  id: true,
  title: true,
  description: true,
  deadline: true,

  creator: {
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
    },
  },
  status: true,
  customer: {
    select: {
      id: true,
      fullName: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  attachments: {
    select: {
      id: true,
      fileUrl: true,
      fileName: true,
    },
  },
} satisfies Prisma.ProjectSelect;

export type ProjectDetailType = Prisma.ProjectGetPayload<{
  select: typeof projectDetailSelect;
}>;

// ProjectListItem

export const projectListItemSelect = {
  id: true,
  title: true,
  deadline: true,
  status: true,

  creator: {
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  customer: {
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
      company: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  },
  _count: {
    select: {
      comments: true,
    },
  },
  tasks: {
    select: {
      status: true,
    },
  },
} satisfies Prisma.ProjectSelect;

export type ProjectListItemType = Prisma.ProjectGetPayload<{
  select: typeof projectListItemSelect;
}>;
