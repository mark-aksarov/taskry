export type UserSummaryDTO = {
  id: string;
  fullName: string;
};

export interface UserDetailDTO {
  id: string;
  fullName: string;
  email: string;
  bio?: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: Date;

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
