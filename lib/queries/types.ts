import { Prisma } from "@/generated/prisma";

export type TaskPreview = Prisma.TaskGetPayload<{
  include: {
    creator: {
      select: {
        id: true;
        fullName: true;
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
        id: true;
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
              fullName: true;
              imageUrl: true;
            };
          };

          target: {
            select: {
              id: true;
              project: { select: { id: true; title: true } };
              task: { select: { id: true; title: true } };
              message: { select: { id: true; body: true } };
              user: { select: { id: true; fullName: true } };
              customer: { select: { id: true; fullName: true } };
            };
          };
        };
      };
    };
  }>;

export type ProjectPreview = Prisma.ProjectGetPayload<{
  include: {
    creator: {
      select: {
        id: true;
        fullName: true;
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
    category: {
      select: {
        id: true;
        name: true;
      };
    };
    customer: {
      select: {
        id: true;
        fullName: true;
        company: {
          select: {
            name: true;
          };
        };
      };
    };
    tasks: {
      select: {
        statusId: true;
      };
    };
  };
}>;

export type UserPreview = Prisma.UserGetPayload<{
  include: {
    position: {
      select: {
        name: true;
        workspaceId: true;
      };
    };
  };
}>;

export type CustomerPreview = Prisma.CustomerGetPayload<{
  include: {
    company: {
      select: {
        name: true;
        workspaceId: true;
      };
    };
  };
}>;

export type Comment = Prisma.CommentGetPayload<{
  include: {
    sender: {
      select: {
        id: true;
        fullName: true;
        imageUrl: true;
      };
    };
    _count: {
      select: {
        likes: true;
        replies: true;
      };
    };
    likes: {
      where?: {
        userId: string;
      };
      select: {
        userId: true;
      };
    };
  };
}>;

export type CommentWithReplies = Prisma.CommentGetPayload<{
  include: {
    sender: {
      select: {
        id: true;
        fullName: true;
        imageUrl: true;
      };
    };
    _count: {
      select: {
        likes: true;
        replies: true;
      };
    };
    likes: {
      where?: {
        userId: string;
      };
      select: {
        userId: true;
      };
    };
    replies: {
      include: {
        sender: {
          select: {
            id: true;
            fullName: true;
            imageUrl: true;
          };
        };
        _count: {
          select: {
            likes: true;
            replies: true;
          };
        };
        likes: {
          where?: {
            userId: string;
          };
          select: {
            userId: true;
          };
        };
      };
    };
  };
}>;
