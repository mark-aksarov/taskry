export type CustomerSummaryDTO = {
  id: number;
  fullName: string;
};

export type CustomerDetailDTO = {
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

export type CustomerListItemDTO = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  publicLink?: string;

  company: {
    id: number;
    name: string;
  };
};
