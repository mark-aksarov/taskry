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
    _count: {
      select: {
        comments: true;
        subtasks: true;
      };
    };
  };
}>;

export type TaskDetail = Prisma.TaskGetPayload<{
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
        id: true;
        name: true;
        isDone: true;
      };
    };
    attachments: {
      select: {
        id: true;
        fileUrl: true;
        fileName: true;
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
    attachments: {
      select: {
        id: true;
        fileUrl: true;
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
    attachments: {
      select: {
        id: true;
        fileUrl: true;
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
        attachments: {
          select: {
            id: true;
            fileUrl: true;
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
