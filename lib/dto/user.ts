export type UserSummaryDTO = {
  id: string;
  fullName: string;
};

export type UserDetailDTO = {
  id: string;
  fullName: string;
  bio?: string;
  email: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: Date;

  position?: {
    name: string;
  };
};

export type UserListItemDTO = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;

  position?: {
    name: string;
  };
};
