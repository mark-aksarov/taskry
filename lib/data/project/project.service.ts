import {
  ProjectDetailDTO,
  ProjectSummaryDTO,
  ProjectFormDataDTO,
  ProjectListDTO,
  ProjectSearchDTO,
} from "./project.dto";

import { ProjectFilters } from "@/lib/types";
import {
  getAllProjects,
  getPaginatedProjects,
  getProject,
} from "./project.dal";

export const getProjectDetail = async (
  id: number,
): Promise<ProjectDetailDTO | null> => {
  const project = await getProject(id, {
    id: true,
    title: true,
    description: true,
    deadline: true,
    status: true,

    creator: {
      select: {
        id: true,
        fullName: true,
        imageUrl: true,
      },
    },

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
  });

  if (!project) {
    return null;
  }

  return {
    id: project.id,
    title: project.title,
    description: project.description ?? undefined,
    deadline: project.deadline,
    status: project.status,
    categoryId: project.category.id,
    customerId: project.customer?.id ?? undefined,
    creator: project.creator
      ? {
          id: project.creator.id,
          fullName: project.creator.fullName,
          imageUrl: project.creator.imageUrl ?? undefined,
        }
      : undefined,
    customer: project.customer
      ? {
          id: project.customer.id,
          fullName: project.customer.fullName,
        }
      : undefined,
    category: project.category,
    attachments: project.attachments,
  };
};

export const getProjectFormData = async (
  id: number,
): Promise<ProjectFormDataDTO | null> => {
  const project = await getProject(id, {
    id: true,
    title: true,
    description: true,
    deadline: true,
    status: true,
    categoryId: true,
    customerId: true,
  });

  if (!project) {
    return null;
  }

  return {
    id: project.id,
    title: project.title,
    description: project.description ?? undefined,
    deadline: project.deadline,
    status: project.status,
    categoryId: project.categoryId ?? undefined,
    customerId: project.customerId ?? undefined,
  };
};

export const getProjectList = async ({
  page,
  pageSize,
  sort,
  filters,
}: {
  page: number;
  pageSize: number;
  sort: string;
  filters?: ProjectFilters;
}): Promise<ProjectListDTO> => {
  const { items: projects, totalCount } = await getPaginatedProjects({
    page,
    pageSize,
    sort,
    filters,
    select: {
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
    },
  });

  return {
    items: projects.map((p) => {
      const totalTasks = p.tasks.length;
      const completedTasks = p.tasks.filter(
        (t: any) => t.status === "completed",
      ).length;

      return {
        id: p.id,
        title: p.title,
        status: p.status,
        deadline: p.deadline,
        creator: p.creator
          ? {
              id: p.creator.id,
              fullName: p.creator.fullName,
              imageUrl: p.creator.imageUrl ?? undefined,
            }
          : undefined,
        customer: p.customer
          ? {
              id: p.customer.id,
              fullName: p.customer.fullName,
              imageUrl: p.customer.imageUrl ?? undefined,
              company: p.customer.company
                ? {
                    id: p.customer.company.id,
                    name: p.customer.company.name,
                  }
                : undefined,
            }
          : undefined,
        category: {
          id: p.category.id,
          name: p.category.name,
        },
        commentsCount: p._count.comments,
        tasks: {
          total: totalTasks,
          completed: completedTasks,
        },
      };
    }),

    totalCount,
  };
};

export const searchProjects = async ({
  query,
  page,
  pageSize,
}: {
  query?: string;
  page: number;
  pageSize: number;
}): Promise<ProjectSearchDTO> => {
  const { items, totalCount } = await getPaginatedProjects({
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

export const getProjectSummaries = async (): Promise<ProjectSummaryDTO[]> => {
  const projects = await getAllProjects({
    select: {
      id: true,
      title: true,
    },
  });

  return projects.map((p) => ({
    id: p.id,
    title: p.title,
  }));
};

export const getProjectSummary = async (
  id: number,
): Promise<ProjectSummaryDTO | null> => {
  const project = await getProject(id, {
    id: true,
    title: true,
  });

  if (!project) {
    return null;
  }

  return {
    id: project.id,
    title: project.title,
  };
};
