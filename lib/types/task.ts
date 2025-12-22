import { Prisma, TaskStatus } from "@/generated/prisma/client";

// TaskSummary

const taskSummarySelect = {
  id: true,
  title: true,
} satisfies Prisma.TaskSelect;

export type TaskSummaryType = Prisma.TaskGetPayload<{
  select: typeof taskSummarySelect;
}>;

// TaskFormData

const taskFormDataSelect = {
  id: true,
  title: true,
  description: true,
  deadline: true,
  status: true,
  categoryId: true,
  projectId: true,
  assigneeId: true,
} satisfies Prisma.TaskSelect;

export type TaskFormDataType = Prisma.TaskGetPayload<{
  select: typeof taskFormDataSelect;
}>;

// TaskDetail

const taskDetailSelect = {
  id: true,
  title: true,
  description: true,
  deadline: true,

  assignee: {
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
    },
  },
  status: true,
  project: {
    select: {
      id: true,
      title: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  subtasks: {
    select: {
      id: true,
      text: true,
      isDone: true,
    },
  },
  attachments: {
    select: {
      id: true,
      fileUrl: true,
      fileName: true,
    },
  },
  _count: {
    select: {
      comments: true,
    },
  },
} satisfies Prisma.TaskSelect;

export type TaskDetailType = Prisma.TaskGetPayload<{
  select: typeof taskDetailSelect;
}>;

// TaskListItem

const taskListItemSelect = {
  id: true,
  title: true,
  deadline: true,

  assignee: {
    select: {
      id: true,
      fullName: true,
      imageUrl: true,
    },
  },
  status: true,
  project: {
    select: {
      id: true,
      title: true,
      status: true,
    },
  },
  category: {
    select: {
      id: true,
      name: true,
    },
  },
  subtasks: {
    select: {
      isDone: true,
    },
  },
  _count: {
    select: {
      comments: true,
      subtasks: true,
    },
  },
} satisfies Prisma.TaskSelect;

export type TaskListItemType = Prisma.TaskGetPayload<{
  select: typeof taskListItemSelect;
}>;

// TaskCategorySummary

const taskCategorySummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.TaskCategorySelect;

export type TaskCategorySummaryType = Prisma.TaskCategoryGetPayload<{
  select: typeof taskCategorySummarySelect;
}>;
