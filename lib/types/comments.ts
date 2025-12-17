import { Prisma } from "@/generated/prisma/client";

// Comment

const commentSelect = {
  id: true,
  content: true,
  createdAt: true,

  sender: {
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
    },
  },
  attachments: {
    select: {
      id: true,
      fileUrl: true,
    },
  },
  _count: {
    select: {
      replies: true,
    },
  },
} satisfies Prisma.CommentSelect;

export type CommentType = Prisma.CommentGetPayload<{
  select: typeof commentSelect;
}>;
