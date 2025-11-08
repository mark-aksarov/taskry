import { Prisma } from "@/generated/prisma";

export type TaskItem = Prisma.TaskGetPayload<{
  select: {
    id: true;
    title: true;
    deadline: true;

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
