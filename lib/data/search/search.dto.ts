export type SearchCategory = "users" | "projects" | "tasks";

export interface SearchRequestDTO {
  query: string;
  page?: number;
  pageSize?: number;
  searchCategory?: SearchCategory;
}

export interface UserSearchItemDTO {
  id: string;
  fullName: string;
  email: string;
  imageUrl?: string;
}

export interface TaskSearchItemDTO {
  id: number;
  title: string;
  deadline: Date;
}

export interface ProjectSearchItemDTO {
  id: number;
  title: string;
  deadline: Date;
}

export interface SearchResponseDTO {
  users?: {
    items: UserSearchItemDTO[];
    totalCount: number;
  };

  tasks?: {
    items: TaskSearchItemDTO[];
    totalCount: number;
  };

  projects?: {
    items: ProjectSearchItemDTO[];
    totalCount: number;
  };
}
