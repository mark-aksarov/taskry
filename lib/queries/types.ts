import { Prisma } from "@/generated/prisma";

export type TaskPreview = Prisma.TaskGetPayload<{
  include: {
    creator: {
      select: {
        name: true;
        imageUrl: true;
      };
    };
    status: {
      select: {
        id: true;
        nameEn: true;
        nameRu: true;
      };
    };
    project: {
      select: {
        id: true;
        title: true;
      };
    };
    category: {
      select: {
        name: true;
      };
    };
    subtasks: {
      select: {
        isDone: true;
      };
    };
  };
}>;

export type TaskCommentPreview = Prisma.TaskCommentGetPayload<{
  include: {
    sender: {
      select: {
        name: true;
        imageUrl: true;
      };
    };
    task: {
      select: {
        title: true;
      };
    };
  };
}>;

export type NotificationRecipientWithRelations =
  Prisma.NotificationRecipientGetPayload<{
    include: {
      notification: {
        select: {
          id: true;
          type: true;
          createdAt: true;
          updatedAt: true;
          targetName: true;

          actor: {
            select: {
              id: true;
              name: true;
              imageUrl: true;
            };
          };

          target: {
            select: {
              id: true;
              project: { select: { id: true; title: true } };
              task: { select: { id: true; title: true } };
              message: { select: { id: true; body: true } };
              user: { select: { id: true; name: true } };
              customer: { select: { id: true; fullName: true } };
            };
          };
        };
      };
    };
  }>;
