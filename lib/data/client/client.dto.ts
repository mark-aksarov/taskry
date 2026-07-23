import { Client } from "@/generated/prisma/browser";

export type ClientSummaryDTO = {
  id: number;
  fullName: string;
};

export interface ClientDTO {
  id: number;
  imageUrl?: string;
  bio?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId?: number;
}

export interface CreateClientInputDTO {
  imageUrl?: string;
  bio?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  companyId?: number;
}

export interface UpdateClientInputDTO {
  id: number;
  bio?: string | null;
  fullName?: string;
  email?: string;
  phoneNumber?: string | null;
  publicLink?: string | null;
  companyId?: number | null;
}

export interface UpdateClientImageUrlInputDTO {
  id: number;
  imageUrl: string | null;
}

export type ClientDetailDTO = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;
  bio?: string;
  workspaceId: number;

  company?: {
    name: string;
  };
};

export type ClientListDTO = {
  items: ClientListItemDTO[];
  totalCount: number;
};

export type ClientListItemDTO = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;

  company?: {
    id: number;
    name: string;
  };
};

export interface ClientSearchDTO {
  items: ClientSearchItemDTO[];
  totalCount: number;
}

export interface ClientSearchItemDTO {
  id: number;
  fullName: string;
  email: string;
  imageUrl?: string;
}

export function mapToClientDTO(
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
