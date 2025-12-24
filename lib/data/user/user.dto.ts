export interface BaseUserDTO {
  id: string;
  fullName: string;
  email: string;
  bio?: string;
  imageUrl?: string;
  phoneNumber?: string;
  address?: string;
  publicLink?: string;
  birthdate?: Date;
  positionId?: number;
}

export type UserSummaryDTO = Pick<BaseUserDTO, "id" | "fullName">;

export interface UserDetailDTO extends Omit<BaseUserDTO, "positionId"> {
  position?: {
    name: string;
  };
}

export interface UserListItemDTO
  extends Pick<
    BaseUserDTO,
    "id" | "fullName" | "email" | "phoneNumber" | "imageUrl" | "publicLink"
  > {
  position?: {
    name: string;
  };
}

export interface UserFilters {
  hasNoActiveTasks?: boolean;
  hasActiveTasks?: boolean;
  hasOverdueTasks?: boolean;
  position: number[];
}
