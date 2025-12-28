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
