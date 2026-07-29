import "server-only";

import {
  ClientDTO,
  ClientListDTO,
  ClientDetailDTO,
  ClientSummaryDTO,
  CreateClientInputDTO,
  UpdateClientInputDTO,
} from "./client.dto";

import { cache } from "react";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AccessDeniedError } from "../utils/error";
import { uniqueDefinedIds } from "../utils/uniqueDefinedIds";
import { ClientFilters, ClientSortField } from "@/lib/types";
import { requireOrganizationAccess } from "../utils/requireOrganizationAccess";
import { Client, Prisma, ProjectStatus } from "@/generated/prisma/client";
import { validateCompanies, validateClientLimit } from "../utils/validation";

export const getClientDetail = cache(
  async (id: number): Promise<ClientDetailDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    // Get client
    const client = await prisma.client.findFirst({
      where: { id, organizationId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        imageUrl: true,
        publicLink: true,
        bio: true,
        organizationId: true,

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
      company: client.company ? client.company : undefined,
    };
  },
);

export const getClient = cache(
  async (id: number): Promise<ClientDTO | null> => {
    // Authorization
    const {
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    // Get client
    const client = await prisma.client.findFirst({
      where: { id, organizationId },
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
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    const client = await prisma.client.findFirst({
      where: { id, organizationId },
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
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    // Get clients
    const clients = await prisma.client.findMany({
      where: { organizationId },
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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  const clients = await prisma.client.findMany({
    where: { organizationId },
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
      session: { activeOrganizationId: organizationId },
    } = await requireOrganizationAccess();

    const where = buildClientWhereClause(organizationId, filters);

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
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  return prisma.client.count({
    where: buildClientWhereClause(organizationId, filters),
  });
});

export const deleteClients = async (ids: number[]) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permission = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        client: ["delete"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to delete clients.",
    );
  }

  // Bulk delete clients within the workspace
  const result = await prisma.client.deleteMany({
    where: {
      organizationId,
      id: { in: ids },
    },
  });

  return result;
};

export const createClients = async (input: CreateClientInputDTO[]) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permission = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        client: ["create"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to create clients.",
    );
  }

  // Validate limit
  await validateClientLimit(organizationId, input.length);

  // Validate companies
  const companyIds = uniqueDefinedIds(input.map((client) => client.companyId));

  if (companyIds.length > 0) {
    await validateCompanies(organizationId, companyIds);
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
      organizationId,
    })),
  });

  return clients.map(mapToClientDTO);
};

export const updateClient = async (input: UpdateClientInputDTO) => {
  // Authorization
  const {
    session: { activeOrganizationId: organizationId },
  } = await requireOrganizationAccess();

  // Check permission
  const permission = await auth.api.hasPermission({
    headers: await headers(),
    body: {
      permissions: {
        client: ["update"],
      },
    },
  });

  if (!permission.success) {
    throw new AccessDeniedError(
      "You do not have permission to update clients.",
    );
  }

  // Validate company
  if (input.companyId) {
    await validateCompanies(organizationId, [input.companyId]);
  }

  // Update client
  const updatedClient = await prisma.client.update({
    where: {
      id: input.id,
      organizationId,
    },
    data: {
      fullName: input.fullName,
      bio: input.bio,
      imageUrl: input.imageUrl,
      companyId: input.companyId,
      email: input.email,
      phoneNumber: input.phoneNumber,
      publicLink: input.publicLink,
    },
  });

  return mapToClientDTO(updatedClient);
};

/**
 * HELPERS
 */

function buildClientWhereClause(
  organizationId: string,
  filters?: ClientFilters,
): Prisma.ClientWhereInput {
  if (!filters) return { organizationId };

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
    organizationId,
    ...(filters?.query && {
      fullName: { contains: filters.query, mode: "insensitive" as const },
    }),
    ...(filters?.companyIds?.length && {
      companyId: { in: filters.companyIds },
    }),
    ...(projectFilters.length > 0 && { OR: projectFilters }),
  };
}

function mapToClientDTO(
  client: Pick<
    Client,
    | "id"
    | "imageUrl"
    | "bio"
    | "fullName"
    | "email"
    | "phoneNumber"
    | "publicLink"
    | "companyId"
  >,
): ClientDTO {
  return {
    id: client.id,
    imageUrl: client.imageUrl ?? undefined,
    bio: client.bio ?? undefined,
    fullName: client.fullName,
    email: client.email,
    phoneNumber: client.phoneNumber ?? undefined,
    publicLink: client.publicLink ?? undefined,
    companyId: client.companyId ?? undefined,
  };
}
