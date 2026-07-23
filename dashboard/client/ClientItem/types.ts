export interface BaseClientItemProps {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  publicLink?: string;
  imageUrl?: string;
  company?: {
    id: number;
    name: string;
  };
}
