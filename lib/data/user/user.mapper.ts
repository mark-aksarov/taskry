import {
  UserDetailType,
  UserListItemType,
  UserSummaryType,
} from "./user.select";

import { UserDetailDTO, UserListItemDTO, UserSummaryDTO } from "./user.dto";

export function mapUserSummaryToDTO(user: UserSummaryType): UserSummaryDTO {
  return {
    id: user.id,
    fullName: user.fullName,
  };
}

export function mapUserDetailToDTO(user: UserDetailType): UserDetailDTO {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? undefined,
    imageUrl: user.imageUrl ?? undefined,
    publicLink: user.publicLink ?? undefined,
    birthdate: user.birthdate ?? undefined,
    position: user.position ?? undefined,
    bio: user.bio ?? undefined,
    address: user.address ?? undefined,
  };
}

export function mapUserListItemToDTO(user: UserListItemType): UserListItemDTO {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber ?? undefined,
    imageUrl: user.imageUrl ?? undefined,
    publicLink: user.publicLink ?? undefined,
    position: user.position ?? undefined,
  };
}
