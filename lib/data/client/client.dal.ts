import "server-only";

import {
  ClientDTO,
  ClientListDTO,
  mapToClientDTO,
  ClientDetailDTO,
  ClientSearchDTO,
  ClientSummaryDTO,
  CreateClientInputDTO,
  UpdateClientInputDTO,
  UpdateClientImageUrlInputDTO,
} from "./client.dto";

import { cache } from "react";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { AccessDeniedError } from "../utils/error";
import { requireSession } from "../utils/requireSession";
import { uniqueDefinedIds } from "../utils/uniqueDefinedIds";
import { ClientFilters, ClientSortField } from "@/lib/types";
import { Prisma, ProjectStatus } from "@/generated/prisma/client";
import { validateCompanies, validateClientLimit } from "../utils/validation";

export const getClientDetail = cache(
  async (id: number): Promise<ClientDetailDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get client
    const client = await prisma.client.findFirst({
      where: { id, workspaceId },
      select: {
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
      },
    });

    if (!client) {
      return null;
    }

    //Map to ClientDetailDTO
    return {
      id: client.id,
      fullName: client.fullName,
      email: client.email,
      phoneNumber: client.phoneNumber ?? undefined,
      imageUrl: client.imageUrl ?? undefined,
      publicLink: client.publicLink ?? undefined,
      bio: client.bio ?? undefined,
      workspaceId: client.workspaceId,
      company: client.company ? client.company : undefined,
    };
  },
);

export const getClient = cache(
  async (id: number): Promise<ClientDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get client
    const client = await prisma.client.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        imageUrl: true,
        publicLink: true,
        bio: true,
        companyId: true,
      },
    });

    if (!client) {
      return null;
    }

    return mapToClientDTO(client);
  },
);

export const getClientSummary = cache(
  async (id: number): Promise<ClientSummaryDTO | null> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const client = await prisma.client.findFirst({
      where: { id, workspaceId },
      select: {
        id: true,
        fullName: true,
      },
    });

    if (!client) {
      return null;
    }

    //Map to ClientSummaryDTO
    return {
      id: client.id,
      fullName: client.fullName,
    };
  },
);

export const getClientSummaries = cache(
  async (): Promise<ClientSummaryDTO[]> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const where = { workspaceId };

    // Get clients
    const clients = await prisma.client.findMany({
      where,
      select: {
        id: true,
        fullName: true,
      },
    });

    //Map to ClientSummaryDTOs
    return clients.map((client) => ({
      id: client.id,
      fullName: client.fullName,
    }));
  },
);

export const getClients = cache(async (): Promise<ClientDTO[]> => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  const clients = await prisma.client.findMany({
    where: { workspaceId },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      imageUrl: true,
      publicLink: true,
      bio: true,
      companyId: true,
    },
  });

  return clients.map(mapToClientDTO);
});

export const searchClients = cache(
  async ({
    query,
    page,
    pageSize,
  }: {
    query?: string;
    page?: number;
    pageSize?: number;
  }): Promise<ClientSearchDTO> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    // Get clients
    const where = {
      workspaceId,
      fullName: { contains: query, mode: "insensitive" as const },
    };

    const [items, totalCount] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy: { fullName: "asc" },
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
          id: true,
          fullName: true,
          email: true,
          imageUrl: true,
        },
      }),
      prisma.client.count({ where }),
    ]);

    //Map to ClientSearchDTO
    return {
      items: items.map((c) => ({
        id: c.id,
        fullName: c.fullName,
        email: c.email,
        imageUrl: c.imageUrl ?? undefined,
      })),
      totalCount,
    };
  },
);

export const getClientList = cache(
  async ({
    page,
    pageSize,
    sort,
    filters,
  }: {
    page?: number;
    pageSize?: number;
    sort?: ClientSortField;
    filters?: ClientFilters;
  }): Promise<ClientListDTO> => {
    // Authorization
    const {
      user: { workspaceId },
    } = await requireSession();

    const where = buildClientWhereClause(workspaceId, filters);

    // Sorting
    let orderBy;

    if (sort === "company") {
      orderBy = [
        {
          company: {
            name: "asc",
          },
        },
        {
          fullName: "asc",
        },
      ] as Prisma.ClientOrderByWithRelationInput[];
    } else if (sort === "fullName") {
      orderBy = {
        fullName: "asc",
      } as Prisma.ClientOrderByWithRelationInput;
    }

    // Get clients
    const [items, totalCount] = await Promise.all([
      prisma.client.findMany({
        where,
        orderBy,
        skip: page && pageSize ? (page - 1) * pageSize : undefined,
        take: pageSize,
        select: {
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
        },
      }),
      prisma.client.count({ where }),
    ]);

    //Map to ClientListDTO
    return {
      items: items.map((client) => ({
        id: client.id,
        fullName: client.fullName,
        email: client.email,
        phoneNumber: client.phoneNumber ?? undefined,
        imageUrl: client.imageUrl ?? undefined,
        publicLink: client.publicLink ?? undefined,
        company: client.company ?? undefined,
      })),
      totalCount,
    };
  },
);

export const getClientCount = cache(async (filters?: ClientFilters) => {
  // Authorization
  const {
    user: { workspaceId },
  } = await requireSession();

  return prisma.client.count({
    where: buildClientWhereClause(workspaceId, filters),
  });
});

export const deleteClients = async (ids: number[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
  const permissions = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        client: ["delete"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete clients.",
    );
  }

  // Bulk delete clients within the workspace
  const result = await prisma.client.deleteMany({
    where: {
      workspaceId,
      id: { in: ids },
    },
  });

  return result;
};

export const createClients = async (input: CreateClientInputDTO[]) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
  const permissions = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        client: ["create"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to create clients.",
    );
  }

  // Validate limit
  await validateClientLimit(workspaceId, input.length);

  // Validate companies
  const companyIds = uniqueDefinedIds(input.map((client) => client.companyId));

  if (companyIds.length > 0) {
    await validateCompanies(workspaceId, companyIds);
  }

  // Create clients
  const clients = await prisma.client.createManyAndReturn({
    data: input.map((client) => ({
      fullName: client.fullName,
      bio: client.bio,
      companyId: client.companyId,
      email: client.email,
      phoneNumber: client.phoneNumber,
      publicLink: client.publicLink,
      imageUrl: client.imageUrl,
      workspaceId,
    })),
  });

  return clients.map(mapToClientDTO);
};

export const updateClient = async (input: UpdateClientInputDTO) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
  const permissions = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        client: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update clients.",
    );
  }

  // Validate company
  if (input.companyId) {
    await validateCompanies(workspaceId, [input.companyId]);
  }

  // Update client
  const updatedClient = await prisma.client.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      fullName: input.fullName,
      bio: input.bio,
      companyId: input.companyId,
      email: input.email,
      phoneNumber: input.phoneNumber,
      publicLink: input.publicLink,
    },
  });

  return mapToClientDTO(updatedClient);
};

export const updateClientImageUrl = async (
  input: UpdateClientImageUrlInputDTO,
) => {
  // Authorization
  const {
    user: { id: userId, workspaceId },
  } = await requireSession();

  // Check permissions
  const permissions = await auth.api.userHasPermission({
    body: {
      userId: userId,
      permissions: {
        client: ["update"],
      },
    },
  });

  if (!permissions.success) {
    throw new AccessDeniedError(
      "You do not have permission to update clients.",
    );
  }

  // Update client
  const updatedClient = await prisma.client.update({
    where: {
      id: input.id,
      workspaceId,
    },
    data: {
      imageUrl: input.imageUrl,
    },
  });

  return mapToClientDTO(updatedClient);
};

/**
 * HELPERS
 */

export function buildClientWhereClause(
  workspaceId: number,
  filters?: ClientFilters,
): Prisma.ClientWhereInput {
  if (!filters) return { workspaceId };

  const projectFilters: Prisma.ClientWhereInput[] = [];

  if (filters?.hasNoActiveProjects) {
    projectFilters.push({
      projects: { none: { status: ProjectStatus.active } },
    });
  }

  if (filters?.hasActiveProjects) {
    projectFilters.push({
      projects: { some: { status: ProjectStatus.active } },
    });
  }

  if (filters?.hasOverdueProjects) {
    projectFilters.push({
      projects: {
        some: {
          status: { not: ProjectStatus.completed },
          deadline: { lt: new Date() },
        },
      },
    });
  }

  return {
    workspaceId,
    ...(filters?.query && {
      fullName: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters?.companyIds?.length && {
      companyId: { in: filters.companyIds },
    }),
    ...(projectFilters.length > 0 && { OR: projectFilters }),
  };
}
