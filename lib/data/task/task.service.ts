import {
  TaskDetailDTO,
  TaskSummaryDTO,
  TaskFormDataDTO,
  TaskSearchDTO,
  TaskListDTO,
} from "./task.dto";

import { TaskFilters } from "@/lib/types";
import { getPaginatedTasks, getTask } from "./task.dal";

export const getTaskDetail = async (
  id: number,
): Promise<TaskDetailDTO | null> => {
  const task = await getTask(id, {
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
  });

  if (!task) {
    return null;
  }

  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline,
    assignee: task.assignee
      ? {
          id: task.assignee.id,
          fullName: task.assignee.fullName,
          imageUrl: task.assignee.imageUrl ?? undefined,
        }
      : undefined,
    status: task.status,
    project: task.project,
    category: task.category,
    subtasks: task.subtasks,
    attachments: task.attachments,
    commentsCount: task._count.comments,
  };
};

export const getTaskFormData = async (
  id: number,
): Promise<TaskFormDataDTO | null> => {
  const task = await getTask(id, {
    id: true,
    title: true,
    description: true,
    deadline: true,
    status: true,
    categoryId: true,
    projectId: true,
    project: {
      select: {
        status: true,
      },
    },
    assigneeId: true,
  });

  if (!task) {
    return null;
  }

  return {
    id: task.id,
    title: task.title,
    description: task.description ?? undefined,
    deadline: task.deadline,
    status: task.status,
    categoryId: task.categoryId ?? undefined,
    projectId: task.projectId ?? undefined,
    projectStatus: task.project.status,
    assigneeId: task.assigneeId ?? undefined,
  };
};

export const getTaskList = async ({
  page,
  pageSize,
  sort,
  filters,
}: {
  page: number;
  pageSize: number;
  sort: string;
  filters?: TaskFilters;
}): Promise<TaskListDTO> => {
  const { items: tasks, totalCount } = await getPaginatedTasks({
    page,
    pageSize,
    sort,
    filters,
    select: {
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
    },
  });

  return {
    items: tasks.map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
      deadline: task.deadline ?? undefined,
      assignee: task.assignee
        ? {
            id: task.assignee.id,
            fullName: task.assignee.fullName,
            imageUrl: task.assignee.imageUrl ?? undefined,
          }
        : undefined,
      project: task.project,
      category: task.category,
      commentsCount: task._count.comments,
      subtasks: {
        total: task._count.subtasks,
        done: task.subtasks.filter((s) => s.isDone).length,
      },
    })),

    totalCount,
  };
};

export const getTaskSummary = async (
  id: number,
): Promise<TaskSummaryDTO | null> => {
  const task = await getTask(id, {
    id: true,
    title: true,
  });

  if (!task) {
    return null;
  }

  return {
    id: task.id,
    title: task.title,
  };
};

export const searchTasks = async ({
  query,
  page,
  pageSize,
}: {
  query?: string;
  page: number;
  pageSize: number;
}): Promise<TaskSearchDTO> => {
  const { items, totalCount } = await getPaginatedTasks({
    page,
    pageSize,
    select: {
      id: true,
      title: true,
      deadline: true,
    },
    filters: { query },
  });

  return {
    items: items.map((p) => ({
      id: p.id,
      title: p.title,
      deadline: p.deadline,
    })),

    totalCount,
  };
};
