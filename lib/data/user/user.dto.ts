export type UserSummaryDTO = {
  id: string;
  fullName: string;
};

export interface UserDTO {
  id: string;
  fullName: string;
  bio?: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: string;
  positionId?: number;
}

export interface UserDetailDTO {
  id: string;
  fullName: string;
  email: string;
  bio?: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: string;

  position?: {
    name: string;
  };
}

export interface UserListDTO {
  items: UserListItemDTO[];
  totalCount: number;
}

export interface UserListItemDTO {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;

  position?: {
    name: string;
  };
}

export interface UserSearchDTO {
  items: UserSearchItemDTO[];
  totalCount: number;
}

export interface UserSearchItemDTO {
  id: string;
  fullName: string;
  email: string;
  imageUrl?: string;
}

export interface CreateUserInputDTO {
  email: string;
  fullName: string;
}

export interface UpdateUserInputDTO {
  id: string;
  fullName?: string;
  positionId?: number | null;
  bio?: string | null;
  birthdate?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  publicLink?: string | null;
}

export interface UpdateUserImageUrlInputDTO {
  id: string;
  imageUrl: string | null;
}

export interface ResetPasswordInputDTO {
  id: string;
  newPassword: string;
}

export interface ChangePasswordInputDTO {
  currentPassword: string;
  newPassword: string;
}
