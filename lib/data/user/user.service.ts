import { UserFilters } from "@/lib/types";
import { getAllUsers, getUser } from "./user.dal";
import { UserDetailDTO, UserListItemDTO, UserSummaryDTO } from "./user.dto";

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
}): Promise<UserListItemDTO[]> => {
  const users = await getAllUsers({
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

  return users.map((u) => ({
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    phoneNumber: u.phoneNumber ?? undefined,
    imageUrl: u.imageUrl ?? undefined,
    publicLink: u.publicLink ?? undefined,
    position: u.position ?? undefined,
  }));
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
