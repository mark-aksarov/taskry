import {
  UserListDTO,
  UserDetailDTO,
  UserSearchDTO,
  UserSummaryDTO,
  UserFormDataDTO,
} from "./user.dto";

import { UserFilters } from "@/lib/types";
import { getAllUsers, getPaginatedUsers, getUser } from "./user.dal";

export const getUserDetail = async (
  id: string,
): Promise<UserDetailDTO | null> => {
  const user = await getUser(id, {
    id: true,
    fullName: true,
    email: true,
    phoneNumber: true,
    imageUrl: true,
    publicLink: true,
    birthdate: true,
    bio: true,
    address: true,

    position: {
      select: {
        name: true,
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? undefined,
    imageUrl: user.imageUrl ?? undefined,
    publicLink: user.publicLink ?? undefined,
    birthdate: user.birthdate ?? undefined,
    bio: user.bio ?? undefined,
    address: user.address ?? undefined,
    position: user.position ? user.position : undefined,
  };
};

export const getUserFormData = async (
  id: string,
): Promise<UserFormDataDTO | null> => {
  const user = await getUser(id, {
    id: true,
    fullName: true,
    phoneNumber: true,
    imageUrl: true,
    publicLink: true,
    birthdate: true,
    bio: true,
    address: true,
    positionId: true,
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber ?? undefined,
    imageUrl: user.imageUrl ?? undefined,
    publicLink: user.publicLink ?? undefined,
    birthdate: user.birthdate ?? undefined,
    bio: user.bio ?? undefined,
    address: user.address ?? undefined,
    positionId: user.positionId ?? undefined,
  };
};

export const getUserList = async ({
  page,
  pageSize,
  sort,
  filters,
}: {
  page: number;
  pageSize: number;
  sort: string;
  filters?: UserFilters;
}): Promise<UserListDTO> => {
  const { items, totalCount } = await getPaginatedUsers({
    page,
    pageSize,
    sort,
    filters,
    select: {
      id: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      imageUrl: true,
      publicLink: true,

      position: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    items: items.map((u) => ({
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      phoneNumber: u.phoneNumber ?? undefined,
      imageUrl: u.imageUrl ?? undefined,
      publicLink: u.publicLink ?? undefined,
      position: u.position ?? undefined,
    })),

    totalCount,
  };
};

export const getUserSummaries = async (): Promise<UserSummaryDTO[]> => {
  const projects = await getAllUsers({
    select: {
      id: true,
      fullName: true,
    },
  });

  return projects.map((p) => ({
    id: p.id,
    fullName: p.fullName,
  }));
};

export const searchUsers = async ({
  page,
  pageSize,
  query,
}: {
  page: number;
  pageSize: number;
  query?: string;
}): Promise<UserSearchDTO> => {
  const { items, totalCount } = await getPaginatedUsers({
    page,
    pageSize,
    select: {
      id: true,
      fullName: true,
      email: true,
      imageUrl: true,
    },
    filters: { query },
  });

  return {
    items: items.map((p) => ({
      id: p.id,
      fullName: p.fullName,
      email: p.email,
      imageUrl: p.imageUrl ?? undefined,
    })),

    totalCount,
  };
};
